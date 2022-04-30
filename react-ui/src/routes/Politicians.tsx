import React, {useEffect, useState} from 'react';
import PoliticiansTable from '../components/PoliticiansTable';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {CircularProgress} from "@mui/material";

function Politicians() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://cs431-02.cs.rutgers.edu:8080/api/congressmen")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.map( (congressman: { [x: string]: any; }) => {
                    return {
                        id: congressman['id'],
                        firstName: congressman['firstName'],
                        lastName: congressman['lastName'],
                        chamber: congressman['chamber'],
                        party: congressman['party'],
                        state: congressman['state'],
                        district: congressman['chamber'] === 'senate' ? '' : (congressman['district'] === 0 ? 'At-Large' : congressman['district']),
                        phone: congressman['phone'],
                        address: congressman['address'],
                        reelectionDate: congressman['reelectionDate'],
                        contactLink: congressman['contactLink'],
                    }
                  })
              );
              console.log(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      
    if (error) {
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <ErrorOutlineIcon style={{fontSize: '100px'}}/>
                <h2>There was an error trying to fetch data from the server. Please try again later.</h2>
            </div>
        )
    }else if(!isLoaded){
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <CircularProgress />
            </div>
        )
    } else{
        return(
            <div>
                <PoliticiansTable politicians = {items} />
            </div>
        )
    }
}
export default Politicians;
