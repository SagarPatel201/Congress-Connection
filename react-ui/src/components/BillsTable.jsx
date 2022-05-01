import {forwardRef} from "react";
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
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import {colorTheme} from "../theme/colorTheme";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

function makeFetchDelete(requestOptions) {
    fetch('http://cs431-02.cs.rutgers.edu:8080/favorites/remove/bill', requestOptions)
        .then(async response => {
            const validJSON = response.headers.get('content-type')?.includes('application/json');
            const data = validJSON && await response.json();
            console.log(data)
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (response.status === 200) {
                console.log(response)
                alert("Success, favorited Bill removed!")
            } else {
                alert("Could Not removed favorited Bill")
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("Could Not Favorite Bill")
        });
}

function makeFetch(requestOptions) {
    fetch('http://cs431-02.cs.rutgers.edu:8080/favorites/bill', requestOptions)
        .then(async response => {
            const validJSON = response.headers.get('content-type')?.includes('application/json');
            const data = validJSON && await response.json();
            console.log(data)
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (response.status === 201) {
                console.log(response)
                alert("Success, favorited Bill!")
            } else if (response.status === 409) {
                alert("Bill is already favorited!")
            } else {
                alert("Could Not Favorite Bill")
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("Could Not Favorite Bill")
        });
}

function removeFavoriteBill(event, rowData) {
    const bodyRequest = {
        "billNumber": rowData['billNumber'],
        "billType": rowData['billType'],
        "userId": localStorage.getItem('ID')
    }
    console.log(bodyRequest)
    const JWT_TOKEN = localStorage.getItem("JWT")
    //'Authorization': `Bearer ${JWT_TOKEN}`
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(bodyRequest)
    };
    makeFetchDelete(requestOptions);
}

function favoriteBill(event, rowData) {
    const bodyRequest = {
        "billNumber": rowData['billNumber'],
        "billType": rowData['billType'],
        "userId": localStorage.getItem('ID')
    }
    console.log(bodyRequest)
    const JWT_TOKEN = localStorage.getItem("JWT")
    //'Authorization': `Bearer ${JWT_TOKEN}`
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(bodyRequest)
    };
    makeFetch(requestOptions)
}

function BillsTable(props) {
    const columns = [
        {title: "Bill Type", field: "billType"},
        {title: "Bill Number", field: "billNumber"},
        {title: "Bill Title", field: "title"},
        {title: "Policy Area", field: "policyArea"},
        {title: "Introduced On", field: "introducedDate"},
        {title: "Last Updated", field: "updateDate"},
    ]

    return (
        <div>
            <MaterialTable
                columns={columns}
                title="United States Bills"
                icons={tableIcons}
                data={props.bills}
                localization={{
                    header: {
                        actions: 'Favorite Bill'
                    }
                }}
                options={{
                    filtering: true,
                    headerStyle: {
                        backgroundColor: colorTheme.palette.primary.dark,
                        color: colorTheme.palette.primary.contrastText,
                    },
                }}
                actions={[
                    {
                        icon: Save,
                        tooltip: 'Favorite Bill',
                        onClick: favoriteBill
                    }, {
                        icon: Delete,
                        tooltip: 'Delete Favorited Bill',
                        onClick: removeFavoriteBill
                    }
                ]}

            />
        </div>
    );
}

export default BillsTable;