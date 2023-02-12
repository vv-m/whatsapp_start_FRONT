//Форма восстановления пароля

//TODO Восстановить пароль - функционал

import React, {useEffect, useState} from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {FormControl} from "@mui/material";
import {useNavigate} from "react-router-dom";
import IsInputsNotEmpty from "../validation/is_inputs_not_empty";
import ValidateEmail from "../validation/validate_email";

function RemindPassword() {
    // Title страницы
    useEffect(() => {
        document.title = 'Восстановление пароля - whatsapp-start.com'
    })

    // Переадресация
    const navigate = useNavigate()

    // Ответ от сервера
    const [isEmailSend, setIsEmailSend] = useState(false);

    // Получение значений из полей формы
    const [values, setValues] = useState('');
    const SetValuesOnChange = event => {
        setValues({...values, [event.target.id]: event.target.value});
    };

    // Валидация полей формы
    const [isValidateEmail, SetValidateEmail] = useState(false)
    const [helperTextEmail, SetHelperTextEmail] = useState('')

    // Очистка error состояние у инпутов при фокусировании
    const clearError = () => {
        SetValidateEmail(false)
        SetHelperTextEmail('')
    }

    // Отправка формы (проверяем заполненность и валидность полей)
    const SendForm = (values) => {
        if (IsInputsNotEmpty(values, ['email'])) {
            console.log('Поля формы заполнены')
            if (ValidateEmail(values['email'])) {
                alert('Валидация прошла успешно')
            } else {
                SetValidateEmail(true)
                SetHelperTextEmail('Не корректный e-mail')
            }
        } else {
            if (!(values['email'])) {
                SetValidateEmail(true)
                SetHelperTextEmail('Обязательное поле')
            }
        }
    }
    return (<>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <h1 style={{marginBottom: '0px'}}>Восстановить пароль</h1>
            <p style={{marginBottom: '24px'}}>Введите e-mail и мы отправим на него ссылку для
                восстановления пароля.</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <FormControl>
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        error={isValidateEmail}
                        helperText={helperTextEmail}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 3,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="email"
                        label="E-mail"
                        defaultValue=""
                    />
                    <Button
                        onClick={() => {
                            SendForm(values)
                        }}
                        sx={{
                            marginBottom: 1,
                            width: {xs: '100%', sm: 380}, height: 56
                        }}
                        variant="contained">Восстановить
                    </Button>
                </FormControl>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            padding: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
            width: {xs: '100%', sm: 380},
            height: 56
        }}>
            <div>
                <Link underline="none" href="/login">Вход</Link>
            </div>
            <div>
                <Link underline="none" href="/sign_in">Регистрация</Link>
            </div>

        </Box>
    </>)
}

export default RemindPassword;

