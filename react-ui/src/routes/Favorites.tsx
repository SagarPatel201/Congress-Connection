import React, {useEffect, useState} from 'react';
import PoliticiansTable from '../components/PoliticiansTable';
import BillsTable from '../components/BillsTable';

function Favorites() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [politicians, setPoliticians] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const JWT_TOKEN = localStorage.getItem("JWT")
        const USER_ID = localStorage.getItem("ID")

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        };

        fetch(`http://cs431-02.cs.rutgers.edu:8080/favorites/politicians/${USER_ID}`, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setPoliticians(result);
              console.log(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )

        fetch(`http://cs431-02.cs.rutgers.edu:8080/favorites/bills/${USER_ID}`, requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setBills(result);
                console.log("Set bills " + result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )

      }, [])

    if (error){
        return(
            <p>Error Loading JSON</p>
        )
    }else if(!isLoaded){
        return(
            <p>Loading JSON results</p>
        )
    }else{
        return(
            <div className = "Table">
                <PoliticiansTable politicians = {politicians} />
                <BillsTable bills = {bills} />
            </div>
        )
    }
}
export default Favorites;