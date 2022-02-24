import requests
from requests.auth import HTTPBasicAuth
import pandas as pd
import numpy as np
import os

if __name__ == "__main__":
    # Constants
    propublica_key = os.environ.get("PROPUBLICA_KEY")

    # ProPublica splits their member api into house and senate.
    house_url = "https://api.propublica.org/congress/v1/117/house/members.json"
    senate_url = "https://api.propublica.org/congress/v1/117/senate/members.json"

    # ProPublica requires entering the API key through this header
    headers = {'X-API-Key' : propublica_key} 
    
    house_query = requests.get(url=house_url, headers=headers)
    senate_query = requests.get(url=senate_url, headers=headers)

    if (house_query.status_code != 200 or senate_query.status_code != 200):
        print("Failed to retrieve from ProPublica API.")
    else:
        # Make Pandas DataFrames out of the members from the query.
        house_members = pd.DataFrame(house_query.json()['results'][0]['members'])
        senate_members = pd.DataFrame(senate_query.json()['results'][0]['members'])

        # Include only the members currently in office.
        house_members = house_members.drop(house_members[house_members['in_office'] == False].index)
        senate_members = senate_members.drop(senate_members[senate_members['in_office'] == False].index)

        # Add a few columns for what we need
        # Add the chamber because the two will be combined into one later.
        house_members['chamber'] = 'house'
        senate_members['chamber'] = 'senate'

        # Add null district to the Senate for convenience later
        senate_members['district'] = ""
        
        # Add the ID
        # Some states have a district "At-Large" that represents the whole state. For those, we will use AL to denote it in the ID. 
        house_members['id'] = house_members['state'] + np.where(house_members['district'] == 'At-Large', 'AL', house_members['district'])
        senate_members['id'] = senate_members['state'] + 'S' + senate_members.groupby('state').cumcount().add(1).astype(str)

        # Refine the columns to only what we need.
        house_members = house_members.loc[:, ['id', 'chamber', 'state', 'district', 'first_name', 'last_name', 'office', 'phone', 'contact_form',  'next_election']]
        senate_members = senate_members.loc[:, ['id', 'chamber', 'state', 'district', 'first_name', 'last_name', 'office', 'phone', 'contact_form', 'next_election']]
        
        members = house_members.append(senate_members).sort_values('id')

        print(members)
