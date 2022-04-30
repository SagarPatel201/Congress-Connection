import React, {useEffect, useState} from 'react';
import PoliticiansTable from '../components/PoliticiansTable';

function Politicians() {
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
    } else{
        return(
            <div>
                <PoliticiansTable politicians = {items} />
            </div>
        )
    }
}
export default Politicians;
