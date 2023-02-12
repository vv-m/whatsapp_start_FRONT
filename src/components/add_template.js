// Добавление шаблона

import React, {useEffect, useState} from 'react';

import axios from "axios";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DoneIcon from '@mui/icons-material/Done';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Preloader from "./modules/preloader";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";


function EditTemplate() {
    // Title страницы
    useEffect(() => {
        document.title = 'Добавить шаблона сообщения - whatsapp-start.com'
    })

    // Pop-up окно
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const [templatesMsg, getTemplatesMsg] = useState([]);

    // Для прелоудера
    const [loading, setLoading] = useState(true);

    const label = "Использовать по умолчанию"

    // Адреса на локалке
    // const url_get = 'http://127.0.0.1:8000/api/v1/users/2/templates/'
    // const url_post = 'http://127.0.0.1:8000/api/v1/users/2/templates/'

    // Адреса на проде
    const url_get = 'http://92.51.24.66:3007/api/v1/users/2/templates/4'
    // const url_post = 'http://92.51.24.66:3007/api/v1/users/2/templates/'

    // let token = 'Bearer '
    // token += localStorage.getItem("token")
    // console.log(token)

    //Конфиг для отправки запроса
    // const config = {
    //     headers: {
    //         "Authorization": token,
    //     }
    // };


    useEffect(() => {
        axios
            .get(url_get)
            .then((data) => {
                console.log(data.data)
                getTemplatesMsg(data.data)
                setLoading(false)
            })
    }, [])


    // let data = new FormData();
    // data.append("text", "шаблон из реакта");
    // function CreateTemplate(){
    //     fetch(url_post, {
    //         method: "POST", // POST, PUT, DELETE, etc.
    //         headers: {"Authorization": token},
    //         body: data
    //     })
    //         .then(response => response.json())
    //         .then(console.log)
    //         .catch(console.error)
    // }


    return (<>
        {loading === false ? (<>
            <h1>Новый шаблон</h1>
            <Box key={templatesMsg.id} sx={{
                display: 'flex', flexDirection: 'column', marginBottom: '16px'
            }}>
                <TextField
                    sx={{width: {xs: '100%', sm: '380px'}, marginBottom: 3}}
                    id="name_template"
                    label="Название шаблона"
                    rows={1}
                    helperText='Введите название шаблона. Например: "Для работы"'
                />
                <TextField
                    sx={{width: {xs: '100%', sm: '380px'}}}
                    id="text_template"
                    label="Текст сообщения"
                    multiline
                    rows={8}
                    helperText='Введите текст сообщения. Например: "Привет, хотел вам предложить кофеварку"'
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Button
                    // onClick={CreateTemplate}
                    type={"submit"}
                    sx={{
                        marginTop: 1, marginBottom: 1, width: {xs: '100%', sm: 380}, height: 56
                    }}
                    variant="contained">Сохранить
                    <DoneIcon sx={{marginLeft: 1}}/>
                </Button>
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
                        <Button href={'/templates_messages'} autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>) : (<Preloader/>)}
    </>);
}

export default EditTemplate;