import {CircularProgress, Grid} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React, {useEffect, useState} from "react";
import PartyDistPie from "../components/PieChartDistr";

function Analytics() {
    const [error, setError] = useState(null);
    const [isCongressmanLoaded, setIsCongressmanLoaded] = useState(false);
    const [congressmen, setCongressmen] = useState([]);

    // Fetch congressmen from the API
    useEffect(() => {
        fetch("http://cs431-02.cs.rutgers.edu:8080/api/congressmen")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsCongressmanLoaded(true);
                    setCongressmen(result);
                    console.log(result);
                },
                (error) => {
                    setIsCongressmanLoaded(true);
                    setError(error);
                }
            );
    }, [])

    if (error){
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
    } else if (!isCongressmanLoaded) {
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
                <CircularProgress />
            </div>
        )
    } else {
        return(
            <div>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={2}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h4>House of Representatives Party Distribution</h4>
                            <PartyDistPie
                                data = {congressmen.filter(congressman => congressman['chamber'] === "house" && congressman['inOffice'] === true)}
                                label={'House of Representatives Party Distribution'}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h4>Senate Party Distribution</h4>
                            <PartyDistPie
                                data = {congressmen.filter(congressman => congressman['chamber'] === "senate" && congressman['inOffice'] === true)}
                                label={'Senate Party Distribution'}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h4>Senators Up for Reelection in 2022 by Party</h4>
                            <PartyDistPie
                                data = {congressmen.filter(congressman => {
                                    return congressman['chamber'] === "senate"
                                        && congressman['inOffice'] === true
                                        && congressman['reelectionDate'] === "2022"
                                })}
                                label={'Senate Party Distribution'}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Analytics;