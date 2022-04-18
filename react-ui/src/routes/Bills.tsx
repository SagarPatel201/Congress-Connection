import React, {useState, useEffect} from 'react';
import CustomDrawer from "../components/CustomDrawer"
import BillsTable from '../components/BillsTable.jsx';
import { fetchPaginate } from "fetch-paginate";
import {Box} from "@mui/material";

function Bills() {
    return(
        <div className = "Table">
            <CustomDrawer />
            <Box
                paddingLeft={30}
            >
                <BillsTable />
            </Box>
        </div>
    )
}
export default Bills;