import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Preloader() {
    return (
        <Box sx={{
            position: 'absolute',
            top: '40%',
            left: 'calc(50% - 28px)'
        }}>
            <CircularProgress/>
        </Box>
    );
}

export default Preloader;