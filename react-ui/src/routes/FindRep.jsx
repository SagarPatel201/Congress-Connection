import React, {useState, useEffect} from 'react';
import CustomDrawer from "../components/CustomDrawer"
import { fetchPaginate } from "fetch-paginate";
import {Box, Button} from "@mui/material";

function onClick(){
    console.log("Clicked")

    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log(latitude + " " + longitude)
      });
  
}

function FindRep() {
    return(
        <div>
            <CustomDrawer />
            <Box
                paddingLeft={40}
            >
                <Button
                onClick={onClick}
                type="submit"
                variant="contained"
                color="primary"
                >
                    Access Location
                </Button>
            </Box>
        </div>
    )
}

export default FindRep;