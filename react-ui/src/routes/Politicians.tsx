import {Box, Paper} from '@mui/material';
import React, {useState, useEffect} from 'react';
import CustomDrawer from "../components/CustomDrawer"
import PoliticiansTable from '../components/PoliticiansTable';
function Politicans() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://cs431-02.cs.rutgers.edu:8080/api/congressmen")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
              console.log(result);
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
                <CustomDrawer />
                <Box
                    paddingLeft = {30}
                >
                <PoliticiansTable rows = {items} />
                    </Box>
            </div>
        )
    }
}
export default Politicans;
