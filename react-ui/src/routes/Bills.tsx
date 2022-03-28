import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import CustomDrawer from "../components/CustomDrawer"
function Bills() {
    return (
        <div className="App">
            <CustomDrawer />
            <p>Bills</p>
        </div>
    );
}

export default Bills;