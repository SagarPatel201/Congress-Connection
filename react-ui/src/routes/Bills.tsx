import React from 'react';
import BillsTable from '../components/BillsTable.jsx';

function Bills() {
    const data = (query: { page: any; pageSize: string; }) => (
        new Promise((resolve, reject) => {
            let url = "http://cs431-02.cs.rutgers.edu:8080/api/bills/all?";
            url += "pageNumber=" + (query.page);
            url += "&pageSize=" + query.pageSize;
            fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    resolve({
                        data: result['content'].map((bill: { [x: string]: string | number | Date; }) => {
                            return {
                                billNumber: bill['billNumber'],
                                billType: bill['billType'],
                                title: bill['title'],
                                policyArea: bill['policyArea'] ?? "None",
                                introducedDate: new Date(bill['introducedDate']).toLocaleDateString(),
                                updateDate: new Date(bill['updateDate']).toLocaleDateString(),
                            }
                        }),
                        page: result['pageable'].pageNumber,
                        totalCount: result.totalPages,
                    });
                });
        }));

    return(
        <div className = "Table">
            <BillsTable bills={data}/>
        </div>
    )
}
export default Bills;