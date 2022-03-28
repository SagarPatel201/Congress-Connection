import requests
import os
import zipfile
import io

# The govinfo site hosts a bulk database of bill statuses filled with xml files instead of a RESTful API. 
# It would take forever to request each individual xml file so instead we can download a zip and extract it.
# XML files suck but Spring Boot is capable of handling them. 

save_loc = '../server/data/'

if not os.path.exists(save_loc):
    os.makedirs(save_loc)

house_zip_url = 'https://www.govinfo.gov/bulkdata//BILLSTATUS/117/hr/BILLSTATUS-117-hr.zip'
senate_zip_url = 'https://www.govinfo.gov/bulkdata//BILLSTATUS/117/s/BILLSTATUS-117-s.zip'

for zip_file_url in [house_zip_url, senate_zip_url]:
    print(f'Now starting download and extraction of {zip_file_url}')
    r = requests.get(zip_file_url, stream=True)
    if r.ok:
        z = zipfile.ZipFile(io.BytesIO(r.content))
        z.extractall(save_loc)
        print('Extraction finished.')
    else:
        print(f'Request for zip failed.')