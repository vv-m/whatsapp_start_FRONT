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

function ChangePassword(props) {
    // Title страницы
    useEffect(() => {
        document.title = 'Изменить пароль - whatsapp-start.com'
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
    const [isValidateOldPassword, SetValidateOldPassword] = useState(false)
    const [isValidateNewPassword, SetValidateNewPassword] = useState(false)
    const [isValidateNewPasswordAgain, SetValidateNewPasswordAgain] = useState(false)
    const [helperTextOldPassword, SetHelperTextOldPassword] = useState('')
    const [helperTextNewPassword, SetHelperTextNewPassword] = useState('')
    const [helperTextNewPasswordAgain, SetHelperNewPasswordAgain] = useState('')

    // Очистка error состояние у инпутов при фокусировании
    const clearError = () => {
        SetValidateOldPassword(false)
        SetValidateNewPassword(false)
        SetValidateNewPasswordAgain(false)
        SetHelperTextOldPassword('')
        SetHelperTextNewPassword('')
        SetHelperNewPasswordAgain('')
    }

    // Отправка формы (проверяем заполненность и валидность полей)
    const SendForm = (values) => {
        if (IsInputsNotEmpty(values, ['old_password', 'new_password', 'new_password_again'])) {
            if (values['new_password'] === values['new_password_again']) {
                console.log('Поля формы заполнены')
                if (IsPasswordValid(values['new_password_again'])) {
                    alert('Валидация прошла успешно')
                } else {
                        SetValidateNewPassword(true)
                        SetValidateNewPasswordAgain(true)
                        SetHelperNewPasswordAgain('Минимальные требования к паролю: 8 символов на латинице, одна заглавная, одна строчная буква, 2 цифры')
                    }
            } else {
                SetValidateNewPassword(true)
                SetValidateNewPasswordAgain(true)
                SetHelperTextNewPassword('Пароли не совпадают')
                SetHelperNewPasswordAgain('Пароли не совпадают')
            }
        } else {
            console.log(values)
            if (!(values['old_password'])) {
                SetValidateOldPassword(true)
                SetHelperTextOldPassword('Обязательное поле')
            }
            if (!(values['new_password'])) {
                SetValidateNewPassword(true)
                SetHelperTextNewPassword('Обязательное поле')
            }
            if (!(values['new_password_again'])) {
                SetValidateNewPasswordAgain(true)
                SetHelperNewPasswordAgain('Обязательное поле')
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
            <h1 style={{marginBottom: '24px'}}>Изменить пароль</h1>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <FormControl>
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextOldPassword}
                        error={isValidateOldPassword}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="old_password"
                        label="Старый пароль"
                        // defaultValue="vlad372@yandex.ru"
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextNewPassword}
                        error={isValidateNewPassword}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 1,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="new_password"
                        label="Новый пароль"
                        // defaultValue="vlad372"
                    />
                    <TextField
                        onKeyUp={SetValuesOnChange}
                        helperText={helperTextNewPasswordAgain}
                        error={isValidateNewPasswordAgain}
                        onFocus={clearError}

                        margin={"dense"}
                        sx={{
                            marginBottom: 3,
                            width: {xs: '100%', sm: 380}
                        }}
                        required
                        id="new_password_again"
                        label="Повторите новый пароль"
                        // defaultValue="Влад"
                    />
                    <Button
                        onClick={() => {
                            console.log(values)
                            SendForm(values)
                        }}
                        type={"submit"}
                        sx={{
                            marginTop: 1, marginBottom: 1, width: {xs: '100%', sm: 380}, height: 56
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
                        marginTop: 1, marginBottom: 2, width: {xs: '100%', sm: 380}, height: 56
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
                        <Button href={"/templates_messages"} autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default ChangePassword;
