import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import CustomDrawer from "../components/CustomDrawer"
import BillsTable from '../components/BillsTable';
import { fetchPaginate } from "fetch-paginate";

function Bills() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    /* Testing Locally
    useEffect(() => {
        setError(null)
        setIsLoaded(true);
        setItems(json);
        console.log(items);
    })*/
    useEffect(() => {
        fetch("http://cs431-02.cs.rutgers.edu:8080/api/bills/all?pageNumber=0&pageSize=100")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result['content']);
              console.log((result));
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
          /*fetch('http://cs431-02.cs.rutgers.edu:8080/congressmen/all')
            .then(response => response.json())
            .then(data => console.log(data));*/
      }, [])
      
    if (error){
        return(
            <p>Error Loading JSON</p>
        )
    }else if(!isLoaded){
        return(
            <p>Loading JSON results</p>
        )
    }else{
        return(
            <div className = "Table">
                <CustomDrawer />
                <BillsTable rows = {items} />
            </div>
        )
    }
}
export default Bills;