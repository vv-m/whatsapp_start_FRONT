// Форма регистрации

//TODO Регистраця - функционал
//TODO Сделать переадресацию в том случае если от сервера ответ 200
//TODO Валидация невернозаполненных полей(логин или емейл уже существует)

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import {FormControl} from "@mui/material";
import IsInputsNotEmpty from "../validation/is_inputs_not_empty";
import ValidateEmail from "../validation/validate_email";
import IsLoginValid from "../validation/validate_login"
import IsPasswordValid from "../validation/validate_password"

function Sign_in() {
    // Title страницы
    useEffect(() => {
        document.title = 'Вход - whatsapp-start.com'
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
    const [isValidateLogin, SetValidateLogin] = useState(false)
    const [helperTextEmail, SetHelperTextEmail] = useState('')
    const [helperTextPassword, SetHelperTextPassword] = useState('')
    const [helperTextLogin, SetHelperTextLogin] = useState('')

    // Очистка error состояние у инпутов при фокусировании
    const clearError = () => {
        SetValidateEmail(false)
        SetValidatePassword(false)
        SetValidateLogin(false)
        SetHelperTextEmail('')
        SetHelperTextPassword('')
        SetHelperTextLogin('')
    }

    // Отправка формы (проверяем заполненность и валидность полей)
    const SendForm = (values) => {
        if (IsInputsNotEmpty(values, ['email', 'password', 'username'])) {
            console.log('Поля формы заполнены')
            if (ValidateEmail(values['email'])) {
                if (IsLoginValid(values['username'])) {
                    if (IsPasswordValid(values['password'])) {
                        alert('Валидация прошла успешно')
                    } else {
                        SetValidatePassword(true)
                        SetHelperTextPassword('Минимальные требования к паролю: 8 символов на латинице, одна заглавная, одна строчная буква, 2 цифры')
                    }
                } else {
                    SetValidateLogin(true)
                    SetHelperTextLogin('Минимальные требования к логину: 5 символов')
                }
            } else {
                SetValidateEmail(true)
                SetHelperTextEmail('Не корректный e-mail')
            }
        } else {
            if (!(values['email']))  {
                SetValidateEmail(true)
                SetHelperTextEmail('Обязательное поле')
            }
            if (!(values['username']) ) {
                SetValidateLogin(true)
                SetHelperTextLogin('Обязательное поле')
            }
            if (!(values['password']))  {
                SetValidatePassword(true)
                SetHelperTextPassword('Обязательное поле')
            }
        }
    }

    // Публичный адрес:
    const url_post = 'http://92.51.24.66:3007/api/v1/auth/signup/'

    //Функция отправки данных из формы
    const CheckPassword = (values) => {
        console.log(values)
        let data = new FormData();
        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password", values.password);
        fetch(url_post, {
            method: "POST", // POST, PUT, DELETE, etc.
            // headers: {"Authorization": token},
            body: data
        })
            .then(response => {
                if (response.status === 200) {
                    response.json();
                    console.log(response.status);
                    setIsEmailSend(true)
                } else {
                    console.log('Ответ сервера');
                    console.log(response.status);
                    console.log(response);
                }
            })
            // .then(console.log)
            // .then(response => {
            //     if (response.)
            // })
            .catch(console.error)
    }

    // Если пароль отправлен на почту - то переадресация на шаблоны
    if (!isEmailSend) {
        return (<>
            <Box sx={{
                display: 'flex', justifyContent: 'center', flexDirection: 'column',
            }}>
                <h1 style={{marginBottom: '0px'}}>Регистрация</h1>
                <p style={{marginBottom: '24px'}}> Чтобы пользоваться шаблонами для отправки
                    сообщений войдите или
                    зарегистрируйтесь.</p>
                <FormControl>
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextEmail}
                        error={isValidateEmail}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1, width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="email"
                        label="E-mail"
                        defaultValue=""
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextLogin}
                        error={isValidateLogin}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1, width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="username"
                        label="Логин"
                        defaultValue=""
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextPassword}
                        error={isValidatePassword}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 3, width: {xs: '100%', sm: 380}
                        }}
                        required
                        type="password"
                        id="password"
                        label="Пароль"
                        defaultValue=""
                    />
                    <Button
                        onClick={() => {
                            console.log(values)
                            SendForm(values)
                        }}
                        type={"submit"}
                        sx={{
                            marginBottom: 1, width: {xs: '100%', sm: 380}, height: 56
                        }}
                        variant="contained">РЕГИСТРАЦИЯ
                    </Button>
                </FormControl>
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
                    <Link underline="none" href="login">Уже есть
                        аккаунт</Link>
                </div>
                <div>
                    <Link underline="none" href="remind_password">Забыли
                        пароль?</Link>

                </div>
            </Box>

        </>)
    } else {
        navigate("/thanks")
    }
}

export default Sign_in;

