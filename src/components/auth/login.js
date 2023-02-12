//Форма входа

//TODO Вход - функционал

import React, {useEffect, useState} from 'react';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {FormControl} from "@mui/material";
import ValidateEmail from "../validation/validate_email";
import IsInputsNotEmpty from "../validation/is_inputs_not_empty";
import IsLoginValid from "../validation/validate_login";
import IsPasswordValid from "../validation/validate_password";
import {useNavigate} from "react-router-dom";

function Login() {
    // Title страницы
    useEffect(() => {
        document.title = 'Авторизация - whatsapp-start.com'
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
    const [isValidatePassword, SetValidatePassword] = useState(false)
    const [helperTextEmail, SetHelperTextEmail] = useState('')
    const [helperTextPassword, SetHelperTextPassword] = useState('')

    // Очистка error состояние у инпутов при фокусировании
    const clearError = () => {
        SetValidateEmail(false)
        SetValidatePassword(false)
        SetHelperTextEmail('')
        SetHelperTextPassword('')
    }

    // Отправка формы (проверяем заполненность и валидность полей)
    const SendForm = (values) => {
        if (IsInputsNotEmpty(values, ['email', 'password'])) {
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
            if (!(values['password'])) {
                SetValidatePassword(true)
                SetHelperTextPassword('Обязательное поле')
            }
        }
    }


    return (<>
        <Box sx={{
            display: 'flex', justifyContent: 'center', flexDirection: 'column',
        }}>
            <h1 style={{marginBottom: '0px'}}>Вход</h1>
            <p style={{marginBottom: '24px'}}>
                Чтобы пользоваться шаблонами для отправки сообщений войдите или зарегистрируйтесь.
            </p>
            <Box sx={{
                display: 'flex', justifyContent: 'center', flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'center', flexDirection: 'column',
                }}>
                    <FormControl>
                        <TextField
                            onKeyUp={SetValuesOnChange}
                            onFocus={clearError}
                            error={isValidateEmail}
                            helperText={helperTextEmail}

                            id={"email"}
                            type={"email"}
                            margin={"dense"}
                            sx={{
                                marginBottom: 1, width: {xs: '100%', sm: 380}
                            }}
                            required={true}

                            label="E-mail"
                            defaultValue=""
                        />
                        <TextField
                            onKeyUp={SetValuesOnChange}
                            onFocus={clearError}
                            error={isValidatePassword}
                            helperText={helperTextPassword}

                            id={"password"}
                            type={"password"}
                            margin={"dense"}
                            sx={{
                                marginBottom: 3, width: {xs: '100%', sm: 380}
                            }}
                            required={true}
                            label="Пароль"
                            defaultValue=""
                        />
                        <Button
                            onClick={() => {
                                SendForm(values)
                            }}

                            type={"submit"}
                            sx={{
                                marginBottom: 1,
                                width: {xs: '100%', sm: 380},
                                height: 56
                            }}
                            variant="contained">Войти
                        </Button>
                    </FormControl>
                </Box>
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
                <Link underline="none" href="/sign_in">Регистрация
                </Link>
            </div>
            <div>
                <Link underline="none" href="/remind_password">Забыли пароль?
                </Link>
            </div>
        </Box>
    </>)
}

export default Login;

