import React from 'react';

import banner_iphone from '../media/image/banner/banner_iphone.png'

import Button from "@mui/material/Button";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


function Banner() {
    return (
        <>
            <div style={{position: 'relative'}}>
                <h2>Шаблоны сообщений</h2>

                <p>Регистрируйся и используй шаблоны сообщений.</p>
                <img  style={{
                    width: '100%',
                    marginTop: '50px'
                }} src={banner_iphone} alt=""/>
                <Button
                    color={"secondary"}
                    href={'/sign_in'}
                    type={"submit"}
                    sx={{
                        position: 'absolute',
                        top: '150px',
                        right: '0px',
                        marginBottom: 2,
                        width: {xs: '50%', sm: 182},
                        height: 56
                    }}
                    variant="contained">РЕГИСТРАЦИЯ
                    <AssignmentIndIcon sx={{marginLeft: 1}}/>
                </Button>
            </div>
        </>
    );
}

export default Banner;