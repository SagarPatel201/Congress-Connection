import React, {useEffect} from 'react';
import BillsTable from '../components/BillsTable.jsx';
import {CircularProgress} from "@mui/material";

function Bills() {
    let [bills, setBills] = React.useState([]);
    let [loading, setLoading] = React.useState(true);
    let [page, SetPage] = React.useState(0);
    const pageSize = 1000;

    useEffect( () => {
        fetch(`http://cs431-02.cs.rutgers.edu:8080/api/bills/all?pageNumber=${page}&pageSize=${pageSize}`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
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
                setLoading(false);
                console.log(newBills);
                if (newBills.length === pageSize) {
                    SetPage(page + 1);
                }
            });
    }, [page])

    if (loading) {
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
    } else {
        return (
            <div className="Table">
                <BillsTable bills={bills}/>
            </div>
        )
    }
}
export default Bills;