import React, {useEffect, useState} from 'react';
import PoliticiansTable from '../components/PoliticiansTable';
import BillsTable from '../components/BillsTable';
import {CircularProgress} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Favorites() {
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [politicians, setPoliticians] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("JWT") !== null) {
            setIsLoggedIn(true);
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
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    if (isLoggedIn) {
        if (error) {
            return (
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
        } else if (!isLoaded) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    flexDirection: 'column',
                    textAlign: 'center'
                }}>
                    <CircularProgress/>
                </div>
            )
        } else {
            return (
                <div className="Table">
                    <PoliticiansTable politicians={politicians}/>
                    <BillsTable bills={bills}/>
                </div>
            )
        }
    } else {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                <ErrorOutlineIcon style={{fontSize: '150px'}}/>
                <h2>You need to be logged in to access this page.</h2>
            </div>
        )
    }
}

export default Favorites;