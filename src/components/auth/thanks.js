import React, {useEffect} from 'react';
import Button from "@mui/material/Button";

function Thanks(props) {

    // Title страницы
    useEffect(() => {
        document.title = 'Спасибо за регистрацию - whatsapp-start.com'
    })

    return (<div>
        <h1 style={{marginBottom: '0px'}}>Спасибо за регистрацию! </h1>
        <p style={{marginBottom: '24px'}}>Проверьте Вашу почту, мы отправили на него письмо со
            ссылкой для
            активации учетной записи</p>
        <Button href="/login" type={"submit"}
                sx={{
                    marginTop: 1, marginBottom: 2, width: {xs: '100%', sm: 380}, height: 56
                }}
                variant="contained">Войти
        </Button>
    </div>);
}

export default Thanks;