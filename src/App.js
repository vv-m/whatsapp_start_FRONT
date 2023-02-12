import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import ResponsiveAppBar from "./components/header";
import TemplatesMessages from "./components/templates";
import SignIn from "./components/auth/sign_in";
import Profile from "./components/auth/profile";
import {Routes, Route, Router, Switch} from "react-router-dom";
import ActivationProfile from "./components/auth/activation_profile";
import Main from "./components/main";
import Login from "./components/auth/login";
import RemindPassword from "./components/auth/remind_password";
import Thanks from "./components/auth/thanks";
import Footer from "./components/footer";
import EditTemplate from "./components/edit_template";
import playground from "./components/playground";
import AddTemplate from "./components/add_template";
import ChangePassword from "./components/auth/change_password";

import {createTheme, ThemeProvider} from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            light: '#5f9787',
            main: '#219653',
            dark: '#26584a',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#ffa733',
            main: '#ff9100',
            dark: '#b26500',
            contrastText: '#353A3F',
        },
    },
    typography: {
        button: { // Here is where you can customise the button
            fontSize: 14,
            fontWeight: 700,
        },
        h1: {
            fontFamily: "Jost",
            color: '#0080fc'
        }
    }
});

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ResponsiveAppBar />
                <Container sx={{
                    width: {xs: '100vw', sm: '380px'},
                    marginBottom: {xs: '16px', sm: '86px'},
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: '16px'
                }}>
                    <div style={{
                        width: 'calc(100vw - 32px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/templates_messages" element={<TemplatesMessages/>}/>
                            <Route path="/sign_in" element={<SignIn/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/thanks" element={<Thanks/>}/>
                            <Route path="/paste" element={<playground/>}/>
                            <Route path="/edit_template" element={<EditTemplate/>}/>
                            <Route path="/remind_password" element={<RemindPassword/>}/>
                            <Route path="/activation_profile" element={<ActivationProfile/>}/>
                            <Route path="/add_template" element={<AddTemplate/>}/>
                            <Route path="/change_password" element={<ChangePassword/>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </Container>

            </ThemeProvider>
        </>
    );
}
