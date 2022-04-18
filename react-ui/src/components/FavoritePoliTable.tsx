import * as React from 'react';
import {ForwardedRef, forwardRef, PropsWithChildren} from "react";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props: PropsWithChildren<{}>, ref : ForwardedRef<any>) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props: PropsWithChildren<{}>, ref: ForwardedRef<any>) => <ViewColumn {...props} ref={ref} />)
};

const PoliticiansTable = (props: any) => {
    return (
        <div>
            <MaterialTable
                icons={tableIcons}
                columns = {[
                    { title: "Chamber", field: "chamber" },
                    { title: "State", field: "state" },
                    { title: "District", field: "district"},
                    { title: "First Name", field: "firstName" },
                    { title: "Last Name", field: "lastName" },
                    { title: "Address", field: "address" },
                    { title: "Phone", field: "phone"},
                    { title: "Re-Election Date", field: "reelectionDate" },
                    { title: "Contact Link", field: "contactLink" },
                ]}
                data = {props.rows}
                title = "Favorited Politicians"
            >
            </MaterialTable>
            
        </div>
    )
}

export default PoliticiansTable;