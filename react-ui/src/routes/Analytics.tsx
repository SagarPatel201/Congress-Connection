import {CircularProgress, Grid} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React, {useEffect, useState} from "react";
import {BillPolicyDistPie, PartyDistPie} from "../components/PieChartDistr";

function Analytics() {
    // Load congressman data
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

    // Load bill data
    let [bills, setBills] = React.useState([]);
    let [billsLoading, setBillsLoading] = React.useState(true);
    let [page, SetPage] = React.useState(0);
    const pageSize = 1000;

    useEffect(() => {
        fetch(`http://cs431-02.cs.rutgers.edu:8080/api/bills/all?pageNumber=${page}&pageSize=${pageSize}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                let newBills = data['content'].map((bill: { [x: string]: string | number | Date; }) => {
                    return {
                        billNumber: bill['billNumber'],
                        billType: bill['billType'],
                        key: `${bill['billType']}${bill['billNumber']}`,
                        title: bill['title'],
                        policyArea: bill['policyArea'] ?? "None",
                        introducedDate: new Date(bill['introducedDate']).toLocaleDateString(),
                        updateDate: new Date(bill['updateDate']).toLocaleDateString(),
                    }
                });
                setBills(bills.concat(newBills));
                console.log(newBills);
                if (newBills.length === pageSize) {
                    SetPage(page + 1);
                } else {
                    setBillsLoading(false);
                }
            });
    }, [page])


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
                <h3>There was an error trying to fetch data from the server. Please try again later.</h3>
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
                <CircularProgress/>
            </div>
        )
    } else {
        return (
            <div>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h1>Congressman Statistics</h1>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h3>House of Representatives Party Distribution</h3>
                            <div style={{
                                height: '55%',
                                width: '55%'
                            }}>
                                <PartyDistPie
                                    data={congressmen.filter(congressman => congressman['chamber'] === "house" && congressman['inOffice'] === true)}
                                    label={'House of Representatives Party Distribution'}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h3>Senate Party Distribution</h3>
                            <div style={{
                                height: '55%',
                                width: '55%'
                            }}>
                                <PartyDistPie
                                    data={congressmen.filter(congressman => congressman['chamber'] === "senate" && congressman['inOffice'] === true)}
                                    label={'Senate Party Distribution'}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h3>Senators Up for Reelection in 2022 by Party</h3>
                            <div style={{
                                height: '55%',
                                width: '55%'
                            }}>
                                <PartyDistPie
                                    data={congressmen.filter(congressman => {
                                        return congressman['chamber'] === "senate"
                                            && congressman['inOffice'] === true
                                            && congressman['reelectionDate'] === "2022"
                                    })}
                                    label={'Senate Party Distribution'}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h1>Bill Statistics</h1>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h3>Bills in the House by Policy Area</h3>
                            {billsLoading ?
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100vw',
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}>
                                    <CircularProgress/>
                                </div>
                                :
                                <div style={{
                                    height: '65%',
                                    width: '65%'
                                }}>
                                    <BillPolicyDistPie bills={bills.filter(bill => bill['billType'] === "HR")}/>
                                </div>}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            textAlign: 'center'
                        }}>
                            <h3>Bills in the Senate by Policy Area</h3>
                            {billsLoading ?
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100vw',
                                    flexDirection: 'column',
                                    textAlign: 'center'
                                }}>
                                    <CircularProgress/>
                                </div>
                                :
                                <div style={{
                                    height: '65%',
                                    width: '65%'
                                }}>
                                    <BillPolicyDistPie bills={bills.filter(bill => bill['billType'] === "S")}/>
                                </div>}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Analytics;