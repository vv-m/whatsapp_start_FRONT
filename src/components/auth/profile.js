import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import DoneIcon from "@mui/icons-material/Done";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useNavigate} from "react-router-dom";
import IsInputsNotEmpty from "../validation/is_inputs_not_empty";
import ValidateEmail from "../validation/validate_email";
import IsLoginValid from "../validation/validate_login";
import IsPasswordValid from "../validation/validate_password";
import {FormControl} from "@mui/material";

function Profile(props) {
    // Title страницы
    useEffect(() => {
        document.title = 'Профиль - whatsapp-start.com'
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
    const [isValidateName, SetValidateName] = useState(false)
    const [isValidateLogin, SetValidateLogin] = useState(false)
    const [helperTextEmail, SetHelperTextEmail] = useState('')
    const [helperTextName, SetHelperTextName] = useState('')
    const [helperTextLogin, SetHelperTextLogin] = useState('')

    // Очистка error состояние у инпутов при фокусировании
    const clearError = () => {
        SetValidateEmail(false)
        SetValidateName(false)
        SetValidateLogin(false)
        SetHelperTextEmail('')
        SetHelperTextName('')
        SetHelperTextLogin('')
    }

    // Отправка формы (проверяем заполненность и валидность полей)
    const SendForm = (values) => {
        if (IsInputsNotEmpty(values, ['name', 'username', 'email'])) {
            console.log('Поля формы заполнены')
            if (ValidateEmail(values['email'])) {
                if (IsLoginValid(values['username'])) {
                    alert('Валидация прошла успешно')
                } else {
                    SetValidateLogin(true)
                    SetHelperTextLogin('Минимальные требования к логину: 5 символов')
                }
            } else {
                SetValidateEmail(true)
                SetHelperTextEmail('Не корректный e-mail')
            }
        } else {
            console.log(values)
            if (!(values['name'])) {
                SetValidateName(true)
                SetHelperTextName('Обязательное поле')
            }
            if (!(values['username'])) {
                SetValidateLogin(true)
                SetHelperTextLogin('Обязательное поле')
            }
            if (!(values['email'])) {
                SetValidateEmail(true)
                SetHelperTextEmail('Обязательное поле')
            }
        }
    }
    // Pop-up окно
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    return (<>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <h1 style={{marginBottom: '0px'}}>Профиль</h1>
            <p style={{marginBottom: '24px'}}>Информация о пользователе.</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <FormControl>
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextEmail}
                        error={isValidateEmail}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="email"
                        label="E-mail"
                        // defaultValue="vlad372@yandex.ru"
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextLogin}
                        error={isValidateLogin}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="username"
                        label="Логин"
                        // defaultValue="vlad372"
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextName}
                        error={isValidateName}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 3,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="name"
                        label="Имя"
                        // defaultValue="Влад"
                    />
                    <Button
                        onClick={() => {
                            console.log(values)
                            SendForm(values)
                        }}
                        type={"submit"}
                        sx={{
                            marginBottom: 2, width: {xs: '100%', sm: 380}, height: 56
                        }}
                        variant="contained">Сохранить
                        <DoneIcon sx={{marginLeft: 1}}/>
                    </Button>
                </FormControl>
                <Button
                    onClick={handleClickOpen}
                    variant="outlined"
                    type={"submit"}
                    sx={{
                        marginBottom: 1, width: {xs: '100%', sm: 380}, height: 56
                    }}
                >Отменить
                    <CancelOutlinedIcon sx={{marginLeft: 1}}/>
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Вы уверены?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Все изменения будут потеряны.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Нет</Button>
                        <Button href={"/"} autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
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
                <Link color={"secondary"} underline="none" href="change_password">Изменить пароль →
                </Link>
            </div>
        </Box>
        </Box>
        {/*<Box sx={{*/}
        {/*    display: 'flex',*/}
        {/*    padding: 1,*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'space-between',*/}
        {/*    marginBottom: 2,*/}
        {/*    width: {xs: '100%', sm: 380},*/}
        {/*    height: 56*/}
        {/*}}>*/}
        {/*    <div>*/}
        {/*        <Link underline="none" href="/sign_in">Регистрация*/}
        {/*        </Link>*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*        <Link underline="none" href="/remind_password">Забыли пароль?*/}
        {/*        </Link>*/}
        {/*    </div>*/}
        {/*</Box>*/}
    </>);
}

export default Profile;
