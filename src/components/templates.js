// Шаблоны

import React, {useEffect, useState} from 'react';

import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Preloader from "./modules/preloader";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useParams} from "react-router";

function TemplatesMessages() {
    // Title страницы
    useEffect(() => {
        document.title = 'Шаблоны сообщений - whatsapp-start.com'
    })

    // Pop-up окно
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    // const [urlTemplate, setUrlTemplate] = useState([]);

    // Эндпоинты для запросов
    const url_get = 'http://127.0.0.1:8000/api/v1/users/2/templates/'
    const url_post = 'http://127.0.0.1:8000/api/v1/users/2/templates/'
    let token = 'Bearer '

    // Добавляем Local Storage ключ "token"
    token += localStorage.getItem("token")

    // Заполнение шаблонов при загрузке
    const [templatesMsg, getTemplatesMsg] = useState([]);

    // Показ прелоудера
    const [loading, setLoading] = useState(true);

    // GET - запрос на получение шаблонов
    useEffect(() => {
        fetch(url_get)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                getTemplatesMsg(data.results)
                setLoading(false)
            })
    }, [])


    // Кнопки редактирования шаблона
    let edit_button = {
        display: 'flex',
        flexDirection: 'row',
        height: '20px',
        marginBottom: '16px'
    }

    // Иконки редактирования шаблона
    let icons = {
        marginRight: '8px',
    }

    return (<>
        {loading === false ? (<>
            <div>
                <h1>Шаблоны</h1>
                <Button
                    href={'/add_template'}
                    type={"submit"}
                    sx={{
                        marginTop: 1,
                        marginBottom: 2,
                        width: {xs: '100%', sm: 380}, height: 56
                    }}
                    variant="contained">Добавить
                    <AddIcon sx={{marginLeft: 1}}/>
                </Button>
                <p>Выберите шаблона сообщения,
                    с которого вы хотите начать общение.</p>
                {templatesMsg.map(item => {
                    return (<Box key={item.id} sx={{
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <h4>Шаблон "{item.name}"</h4>
                        <Link href={'/edit_template/'+ item.id} underline="none">
                            <TextField
                                disabled
                                sx={{
                                    width: {xs: '100%', sm: '380px'},
                                    marginBottom: '16px'
                                }}
                                id="outlined-multiline-static"
                                label="Сообщение"
                                multiline
                                rows={3}
                                defaultValue={item.text}/>
                        </Link>
                        <Box style={edit_button}>
                            <PanoramaFishEyeSharpIcon style={icons}
                                                      color={'black'}/>
                            <Link color={'typography'} underline={'none'}>Использовать по
                                умолчанию </Link>
                        </Box>
                        <Box style={edit_button}>
                            <CreateSharpIcon style={icons}
                                             color={'typography'}/>
                            <Link color={'black'}
                                href='/edit_template'
                                underline={'none'}>Редактировать
                            </Link>
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
                                        Подтвердите удаление шаблона.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Нет</Button>
                                    <Button onClick={handleClose} autoFocus>
                                        Да
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                        <Box style={edit_button}>
                            <HighlightOffRoundedIcon style={icons}
                                                     color={'typography'}/>
                            <Link onClick={handleClickOpen}
                                  color={'black'}
                                  href='#'
                                  underline={'none'}>Удалить
                            </Link>
                        </Box>
                    </Box>)
                })}
            </div>
        </>) : (<Preloader/>)}
    </>);
}

export default TemplatesMessages;