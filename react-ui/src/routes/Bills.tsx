import React, {useState, useEffect} from 'react';
import CustomDrawer from "../components/CustomDrawer"
import BillsTable from '../components/BillsTable.jsx';
import { fetchPaginate } from "fetch-paginate";
import {Box} from "@mui/material";

function Bills() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
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
                <Box
                    paddingLeft={30}
                >
                    <BillsTable />
                </Box>
            </div>
        )
    }
}
export default Bills;