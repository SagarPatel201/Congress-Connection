import React, {useEffect, useState, useCallback} from 'react';
import {forwardRef} from 'react';
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
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function makeFetchDelete(requestOptions){
    fetch('http://cs431-02.cs.rutgers.edu:8080/favorites/remove/politician', requestOptions)
    .then(async response => {
        const validJSON = response.headers.get('content-type')?.includes('application/json');
        const data = validJSON && await response.json();
        console.log(data)
        if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        if(response.status === 200){ //might have to change to 201
            console.log(response)
            alert("Success, favorited politician removed!")
        }else{
            alert("Could Not Removed Favorited Politician")
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        alert("Could Not Favorite Politician")
    });
}

function makeFetch(requestOptions) {
    fetch('http://cs431-02.cs.rutgers.edu:8080/favorites/politician', requestOptions)
        .then(async response => {
            const validJSON = response.headers.get('content-type')?.includes('application/json');
            const data = validJSON && await response.json();
            console.log(data)
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if(response.status === 201){ //might have to change to 201
                console.log(response)
                alert("Success, favorited politician!")
            }else if(response.status === 409){
                alert("Politician already favorited!")
            }else{
                console.log(response.status)
                alert("Could Not Favorite Politician")
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert("Could Not Favorite Politician")
        });
}

function removePoliticianFavorite(event, rowData){
    console.log(rowData['id'])
    const bodyRequest = {
        "politicianId": rowData['id'],
        "userId" : localStorage.getItem('ID')
    }
    console.log(bodyRequest)
    const JWT_TOKEN = localStorage.getItem("JWT")
    console.log(JWT_TOKEN)
    //'Authorization': `Bearer ${JWT_TOKEN}`
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify(bodyRequest)
    };
    makeFetchDelete(requestOptions)
}

function favoritePolitician(event, rowData) {
    const bodyRequest = {
        "politicianId": rowData['id'],
        "userId" : localStorage.getItem('ID')
    }
    console.log(bodyRequest)
    const JWT_TOKEN = localStorage.getItem("JWT")
    //'Authorization': `Bearer ${JWT_TOKEN}`
    console.log(JWT_TOKEN)
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

function onClick(){
    console.log("Clicked")

    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        alert(latitude + " " + longitude)
      });
}

const PoliticiansTable = (props) => {
    const [text, setText] = useState("")
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    console.log(text)
    const columns = [
        { title: "Chamber", field: "chamber" },
        { title: "State", field: "state" },
        { title: "District", field: "district"},
        { title: "Party", field: "party" },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Address", field: "address" },
        { title: "Phone", field: "phone"},
        { title: "Re-Election Date", field: "reelectionDate" },
        { title: "Contact Link", field: "contactLink" },
    ]
    return (
        <div>
            <MaterialTable
                title = "United States Congressmen"
                icons={tableIcons}
                columns = {columns}
                data = {props.politicians}
                localization={{
                    header: {
                        actions: 'Favorite Congressman'
                    },
                }}
                options={{
                    searchText: text
                }}
                actions={[
                    {
                        icon: Save,
                        tooltip: 'Favorite Politician',
                        onClick: favoritePolitician
                    },
                    {
                      icon: Delete,
                      tooltip: 'Delete Favorited Politician',
                      onClick: removePoliticianFavorite
                    },{
                        icon: AddLocationAltIcon,
                        tooltip: "Get Politicians By Location",
                        position: "toolbar",
                        onClick: () =>{
                            alert("Clicked")
                            forceUpdate();
                            setText("NJ")
                        }
                    }
                ]}
            >
            </MaterialTable>
        </div>
    )
}

export default PoliticiansTable;