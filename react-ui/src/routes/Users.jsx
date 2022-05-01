import {forwardRef, useEffect, useState} from "react";
import MaterialTable from "material-table";
import { Navigate } from "react-router-dom"

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
import Delete from '@material-ui/icons/Delete';

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

function deleteUser(event, userData) {
    const JWT_TOKEN = localStorage.getItem("JWT")
    const bodyRequest = {
        "id": userData['id']
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWT_TOKEN}`
        },
        body: JSON.stringify(bodyRequest)
    }

    fetch(`http://cs431-02.cs.rutgers.edu:8080/login/user/delete/${userData['id']}`, options)
        .then(response => {
            if (response.status === 200) {
                alert("User deleted successfully.")
                window.location.reload()
            } else {
                alert("User deletion failed.")
            }
        })
        .catch(error => {
            alert("User deletion failed.")
        })
}

function Users() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("ROLES") === "ROLE_ADMIN");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("ROLES") === "ROLE_ADMIN") {
            setIsAdmin(true);

            fetch('http://cs431-02.cs.rutgers.edu:8080/login/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("JWT")
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(error => console.log(error));
        }
    })

    const columns = [
        { title: "ID", field: "id"},
        { title: "Username", field: "username"},
        { title: "Role", field: "roles"},
    ]

    return (
        <div>
            {isAdmin ? (
                <MaterialTable
                    title={"All Users"}
                    columns={columns}
                    icons={tableIcons}
                    data={users}
                    actions={[
                        {
                            icon: Delete,
                            tooltip: 'Delete User',
                            onClick: deleteUser,
                        }
                    ]}
                />
            ) : (
                <Navigate to={'/'}/>
            )}
        </div>
    )
}

export default Users;
