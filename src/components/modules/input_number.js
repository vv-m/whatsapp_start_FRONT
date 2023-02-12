//Форма ввода телефона и отправки сообщения в WhatsAapp

import * as React from 'react';
import {useEffect, useState} from "react";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ru from 'react-phone-input-2/lang/ru.json'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function InputNumber() {
    let inputNumber = React.createRef()

    const [currentUrl, setCurrentUrl] = useState('')

    let url = 'whatsapp://send?phone='

    function setUrl(tel) {
        let link = url + tel
        setCurrentUrl(link)
    }

    let preferredCountries = ['ru', 'by', 'ua', 'kz']
    // let priority = {'ru': 1, 'by': 1, 'ua': 2, 'kz': 3}

    let inputStyle = {
        height: '56px',
        width: '100%',
    }

    const [phone, setPhone] = useState('+ ');

    // Очищаем значение в input
    useEffect(() => {
        setPhone(' ')
    }, []);

    return (<>
        <Box display={"flex"}
             justifyContent={"left"}
             flexDirection={{xs: 'column'}}
             sx={{
                 width: {xs: '100%', sm: '380px'},
                 marginBottom: 2,
                 // marginRight: {xs: 0, md: 2}
             }}>

            <Box sx={{
                width: '100%',
                marginBottom: 2,
                marginRight: {xs: 0, md: 2}
            }}>
                <PhoneInput
                    localization={ru}
                    enableClickOutside={true}
                    jumpCursorToEnd={true}
                    onFocus={event => setPhone('+')}
                    onChange={(value, country, e) => setUrl(value)}
                    value={phone}
                    country={'ru'}
                    placeholder={'Например 79211234567 '}
                    inputRef={inputNumber}
                    inputStyle={inputStyle}
                    inputProps={{
                        name: 'phone', required: true, // autoFocus: true
                    }}
                    disableDropdown={false}
                    preferredCountries={preferredCountries}
                    // onChange={setUrl}
                    // prefix={'+'}
                    // value={this.state.phone}
                    // onChange={phone => this.setState({ phone })}
                    // priority={priority}
                    // copyNumbersOnly={false}
                    // disableInitialCountryGuess={true}
                    // disableCountryGuess={true}
                    // enableAreaCodes={true}
                    // disableCountryCode={true}
                />
            </Box>
            <Box>
                <Box display={"flex"} flexDirection={{xs: 'column', sm: 'row'}}>
                    <Button
                        href={currentUrl}
                        sx={{
                            height: 56, width: '100%', // marginRight: 2,
                            marginBottom: 2,
                            order: {xs: '1', sm: '3'}
                        }}
                        variant="contained">Написать</Button>
                    <Button onClick={event => setPhone('+ ')}
                            sx={{
                                height: 56,
                                width: '100%',
                                marginBottom: 2,
                                marginRight: {xs: 0, sm: 2},
                                order: '2'
                            }}
                            variant="outlined">Очистить</Button>
                </Box>
            </Box>


        </Box>
    </>);
}