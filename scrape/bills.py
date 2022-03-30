import requests
import os
import shutil
import zipfile
import io
import xml.etree.ElementTree as ET
from sqlalchemy import create_engine, MetaData, Table, select, func
from sqlalchemy.dialects.mysql import insert
import pymysql
import time
from datetime import datetime
from dateutil import parser

# The govinfo site hosts a bulk database of bill statuses filled with xml files instead of a RESTful API. 
# It would take forever to request each individual xml file so instead we can download a zip and extract it.
# XML files suck but Spring Boot is capable of handling them. 

start_time = time.time()
save_loc = 'temp/bills/'

if not os.path.exists(save_loc):
    os.makedirs(save_loc)

# Get database login information from the conda environment
user = os.environ.get('USER')
passw = os.environ.get('PASS')
host = os.environ.get('DB_HOST')
port = os.environ.get('PORT')
db = os.environ.get('DB')

# Create table representations and engine for connecting
engine = create_engine(f'mysql+pymysql://{user}:{passw}@{host}:{port}/{db}')
meta_data = MetaData(bind=engine)

politicians_table = Table('politicians', meta_data, autoload=True)
bills_table = Table('bills', meta_data, autoload=True)
committees_table = Table('committees', meta_data, autoload=True)
bc_table = Table('billcommittee', meta_data, autoload=True)
sponsorships_table = Table('sponsorships', meta_data, autoload=True)
cosponsorships_table = Table('cosponsorships', meta_data, autoload=True)

# Fetch bill information from bulk repository
house_zip_url = 'https://www.govinfo.gov/bulkdata/BILLSTATUS/117/hr/BILLSTATUS-117-hr.zip'
senate_zip_url = 'https://www.govinfo.gov/bulkdata/BILLSTATUS/117/s/BILLSTATUS-117-s.zip'

for zip_file_url in [house_zip_url, senate_zip_url]:
    print(f'Now starting download and extraction of {zip_file_url}')
    r = requests.get(zip_file_url, stream=True)
    if r.ok:
        z = zipfile.ZipFile(io.BytesIO(r.content))
        z.extractall(save_loc)
        print('Extraction finished.')
    else:
        print(f'Request for zip failed.')

data_files = os.listdir(save_loc)

with engine.connect() as conn: 
    i = 1
    for file in data_files:
        print(f'Processing {file} ({i} / {len(data_files)})', end='\r')
        tree = ET.parse(save_loc + file)
        root = tree.getroot()

        # Load up what we need for the bills table. 
        bill_type = root.findall('./bill/billType')[0].text
        bill_number = int(root.findall('./bill/billNumber')[0].text)
        bill_title = root.findall('./bill/title')[0].text
        introduced_date = root.findall('./bill/introducedDate')[0].text
        update_date = parser.isoparse(root.findall('./bill/updateDate')[0].text).strftime('%Y-%m-%d')
        congress = int(root.findall('./bill/congress')[0].text)
        policy_area = root.findall('./bill/policyArea/name')
        policy_area = policy_area[0].text if len(policy_area) != 0 else None

        bill_insert_stmt = insert(bills_table).values(
            bill_type=bill_type,
            bill_number=bill_number, 
            title=bill_title,
            introduced_date=introduced_date,
            update_date=update_date,
            congress=congress,
            policy_area=policy_area
        )
        
        bill_upsert_stmt = bill_insert_stmt.on_duplicate_key_update(
            title=bill_title,
            introduced_date=introduced_date,
            update_date=update_date,
            congress=congress,
            policy_area=policy_area,
            status='U'
        )

        conn.execute(bill_upsert_stmt)

        # Now for the committees table.
        committees = root.findall('./bill/committees/billCommittees/item')
        for item in committees:
            committee_system_code = item.find('systemCode').text
            committee_name = item.find('name').text
            committee_chamber = item.find('chamber').text
            
            committee_insert_stmt = insert(committees_table).values(
                ID=committee_system_code,
                name=committee_name,
                chamber=committee_chamber
            )

            committee_upsert_stmt = committee_insert_stmt.on_duplicate_key_update(
                ID=committee_system_code,
                name=committee_name,
                chamber=committee_chamber,
                status='U'
            )

            conn.execute(committee_upsert_stmt)

            # Bill Committee Relationship
            bc_insert_stmt = insert(bc_table).values(
                bill_type=bill_type,
                bill_number=bill_number,
                committee_id=committee_system_code
            )

            bc_upsert_stmt = bc_insert_stmt.on_duplicate_key_update(
                bill_type=bill_type,
                bill_number=bill_number,
                committee_id=committee_system_code,
                status='U'
            )

            conn.execute(bc_upsert_stmt)

        # Sponsors
        sponsors = root.findall('./bill/sponsors/item')
        for item in sponsors:
            # Get the sponsors id. If it's a senator then we are in a load of shit because we have do a sql query for the id.
            # For the house we can get the id with state and district.
            sponsor_state = item.find('state').text
            if bill_type == 'HR':
                sponsor_district = item.find('district').text
                if sponsor_district == '0': # 0 means at large
                    sponsor_district = 'AL'
                sponsor_id = sponsor_state + sponsor_district
            else:
                # This is a bad solution but its the best I've got.
                # Lookup the id in the database using the state and last name of the sponsor.
                sponsor_last_name = item.find('lastName').text
                sponsor_select_stmt = select(politicians_table.c.ID).where(
                    politicians_table.c.state == sponsor_state and
                    politicians_table.c.last_name == sponsor_last_name
                ).limit(1)

                sponsor_id = conn.execute(sponsor_select_stmt).first()[0]

            sponsors_insert_stmt = insert(sponsorships_table).values(
                sponsor_id=sponsor_id,
                bill_type=bill_type,
                bill_number=bill_number
            )

            sponsors_upsert_stmt = sponsors_insert_stmt.on_duplicate_key_update(
                sponsor_id=sponsor_id,
                bill_type=bill_type,
                bill_number=bill_number,
                status='U'
            )

            conn.execute(sponsors_upsert_stmt)

        # Cosponsors
        cosponsors = root.findall('./bill/cosponsors/item')
        for item in cosponsors:
            cosponsorship_date = item.find('sponsorshipDate').text
            is_original_cosponsor = True if item.find('isOriginalCosponsor').text == "True" else False

            # Get the sponsors id. If it's a senator then we are in a load of shit because we have do a sql query for the id.
            # For the house we can get the id with state and district.
            cosponsor_state = item.find('state').text
            if bill_type == 'HR':
                cosponsor_district = item.find('district').text
                if cosponsor_district == '0': # 0 means at large
                    cosponsor_district = 'AL'
                cosponsor_id = cosponsor_state + cosponsor_district
            else:
                # This is a bad solution but its the best I've got.
                # Lookup the id in the database using the state and last name of the cosponsor.
                cosponsor_last_name = item.find('lastName').text
                cosponsor_select_stmt = select(politicians_table.c.ID).where(
                    politicians_table.c.state == cosponsor_state and
                    politicians_table.c.last_name == cosponsor_last_name
                ).limit(1)

                cosponsor_id = conn.execute(cosponsor_select_stmt).first()[0]

            cosponsors_insert_stmt = insert(cosponsorships_table).values(
                cosponsor_id=cosponsor_id,
                bill_type=bill_type,
                bill_number=bill_number,
                cosponsorship_date=cosponsorship_date,
                is_original=is_original_cosponsor
            )

            cosponsors_upsert_stmt = cosponsors_insert_stmt.on_duplicate_key_update(
                cosponsor_id=cosponsor_id,
                bill_type=bill_type,
                bill_number=bill_number,
                cosponsorship_date=cosponsorship_date,
                is_original=is_original_cosponsor,
                status='U'
            )

            conn.execute(cosponsors_upsert_stmt)

        i += 1

shutil.rmtree(save_loc)

execution_time = time.time() - start_time;
print('\n')
print(f'Executed in {round(execution_time)} seconds')
