import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { Link } from "react-router-dom"



const theme = createTheme({
    palette: {
        primary: {
            main: '#353A3F',
            // main: '#ec407a',
        },
        secondary: {
            main: '#29b6f6',
            // main: '#343A40',
        },
    },
});

const pages_dict = [['Шаблоны', 'templates_messages'], ['Профиль', 'profile'], ['Войти', 'sign_in']];
const pages = ['Шаблоны', 'Профиль', 'Войти'];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const spanStyle = {color: '#24c76f'};

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/*Логотип - название*/}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'Jost',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            WHATSAPP <span style={spanStyle}>START</span>
                        </Typography>

                        {/*Кнопка меню*/}
                        <Box sx={{
                            flexGrow: 1,
                            display: {xs: 'flex', md: 'none'}
                            }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {
                                    pages_dict.map((page) => (
                                            <MenuItem
                                            component={Link}
                                            to={page[1]}
                                            key={page[1]}

                                                  onClick={handleCloseNavMenu}>
                                            <Typography
                                                textAlign="center">
                                                {page[0]}
                                            </Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Box>

                        {/*Название для маленьких экранов*/}
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'Jost',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            WHATSAPP <span style={spanStyle}>START</span>
                        </Typography>

                        {/*Меню для большого экрана*/}

                        <Box sx={{
                            flexGrow: 1,
                            display: {xs: 'none', md: 'flex'},
                            justifyContent: 'end'
                        }}>
                            {pages_dict.map((page) => (
                                <Button
                                    key={page[1]}
                                    href={page[1]}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                >
                                    {page[0]}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}


export default ResponsiveAppBar;