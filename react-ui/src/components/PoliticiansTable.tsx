import * as React from 'react';
import MaterialTable from "material-table";

const PoliticiansTable = (props: any) => {
    return (
        <div>
            <MaterialTable
                columns = {[
                    { title: "First Name", field: "firstName" },
                    { title: "Last Name", field: "lastName" },
                    { title: "Chamber", field: "chamber" },
                    { title: "Address", field: "address" },
                    { title: "State", field: "state" },
                    { title: "Phone", field: "phone"},
                    { title: "Re-Election Date", field: "reelectionDate" },
                    { title: "Contact Link", field: "contactLink" },
                ]}
                data = {props.rows}
                title = "United States Congressmen"
            >
            </MaterialTable>
        </div>
    )
}

export default PoliticiansTable;