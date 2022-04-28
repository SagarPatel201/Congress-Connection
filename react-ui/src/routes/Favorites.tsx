import React, {useEffect, useState} from 'react';
import PoliticiansTable from '../components/FavoritePoliTable';
import BillsTable from '../components/FavoriteBillsTable';

function Favorites() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [politicians, setPoliticians] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const JWT_TOKEN = localStorage.getItem("JWT")

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        };

        let URL1 = "http://cs431-02.cs.rutgers.edu:8080/favorites/politicians/"
        let URL2 = "http://cs431-02.cs.rutgers.edu:8080/favorites/bills/"
        URL1 += localStorage.getItem("ID")
        URL2 += localStorage.getItem("ID")

        fetch(URL1, requestOptions)
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

        fetch(URL2, requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setBills(result);
                console.log(result);
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
                <PoliticiansTable rows = {politicians} />
                <BillsTable rows = {bills} />
            </div>
        )
    }
}
export default Favorites;