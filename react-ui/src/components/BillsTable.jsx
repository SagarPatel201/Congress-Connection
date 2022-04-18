import { Component } from "react";
import MaterialTable from "material-table";
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
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
  };;

  function makeFetch(requestOptions){
    fetch('http://cs431-02.cs.rutgers.edu:8080/favorites/bill', requestOptions)
    .then(async response => {
        const validJSON = response.headers.get('content-type')?.includes('application/json');
        const data = validJSON && await response.json();
        console.log(data)
        if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }
        if(response.status === 200){
            console.log(response)
            alert("Success, favorited Bill!")
        }else if(response.status === 409){
            alert("Could Not Favorite Bill!")
        }else{
            alert("Could Not Favorite Bill")
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        alert("Could Not Favorite Bill")
    });
  }


function favoriteBill(event, rowData){
  const bodyRequest = {
    "billNumber": rowData['billNumber'],
    "billType": rowData['billType'],
    "userId" : localStorage.getItem('ID')
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

class BillsTable extends Component {
  render() {
    const columns = [
        { title: "Bill Number", field: "billNumber" },
        { title: "Bill Title", field: "title" },
        { title: "Bill Type", field: "billType" },
    ]
    const data = (query) => (
        new Promise((resolve, reject) => {
            let url = "http://cs431-02.cs.rutgers.edu:8080/api/bills/all?";
            url += "pageNumber=" + (query.page);
            url += "&pageSize=" + query.pageSize;
          fetch(url)
            .then((response) => response.json())
            .then((result) => {
              resolve({
                data: result['content'],
                page: result['pageable'].pageNumber,
                totalCount: result.totalPages,
              });
            });
        }));
  
    return (
      <div>
        <MaterialTable
          title="United States Bills"
          icons={tableIcons}
          columns={columns}
          data={data}
          localization={{
            header: {
                actions: 'Favorite Bill'
            } 
        }}
        actions={[
          {
            icon: Save,
            tooltip: 'Favorite Politician',
            onClick: favoriteBill
          }
        ]}

        />
      </div>
    );
  }
}

export default BillsTable;