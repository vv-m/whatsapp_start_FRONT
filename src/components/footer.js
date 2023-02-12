import * as React from 'react';

import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";


const theme = createTheme({
    palette: {
        primary: {
            main: '#353A3F',
        },
        secondary: {
            main: '#29b6f6',
        },
    },
});

function Footer() {
    let year = new Date().getFullYear()

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xxl"
                       sx={{
                width: '100vw',
                bottom: '0px',
                height: '70px',
                position: 'fixed',
                background: '#343a40',
                display: {xs: "none", sm: 'block'}
            }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: '25px',
                        height: "70px"}}>
                        <Link sx={{color: "white"}}
                              underline="always" variant="caption"
                              href="https://t.me/LR_STUDIO">Разработка -
                            Vlad Mironov© {year}
                        </Link>
                    </Box>
            </Container>
        </ThemeProvider>
    );
}


export default Footer;