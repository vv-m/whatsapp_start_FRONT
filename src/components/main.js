//Страница ввода телефона

import React, {Component} from 'react';

import Box from "@mui/material/Box";
import InputNumber from "./modules/input_number";
import Banner from "./banner";

class Main extends Component {

    render() {
        return (<>
            <Box sx={{
                display: 'flex', justifyContent: 'center', flexDirection: 'column',
            }}>
                    <h1 style={{marginBottom: '0px'}}>Введите номер</h1>
                        <p style={{marginBottom: '24px'}}>Вставьте или введите номер телефона. Страна определяется автоматически.
                        </p>
                <InputNumber />
                <Banner />
            </Box>
        </>);
    }
}

export default Main;

