import React from 'react';
import logo from './logo.svg';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import CustomDrawer from "../components/CustomDrawer"
function Politicans() {
    return (
        <div className="App">
            <CustomDrawer />
            <p>Politicans</p>
        </div>
    );
}

export default Politicans;