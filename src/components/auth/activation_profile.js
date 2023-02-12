import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

function ActivationProfile(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const username = searchParams.get("username")
    const confirmation_code = searchParams.get("confirmation_code")
    console.log(username, confirmation_code)
    //Сохраняем username и confirmation_code в localStorage
    const url = 'http://92.51.24.66:3007/api/v1/auth/confirmation_code/' + username + '/' + confirmation_code

    useEffect(() => {
        const token = fetch(url)
            .then(response => response.json())
            .then(response => localStorage.setItem("token", response.token)
            )
            .catch(console.error);
        return () => {
            localStorage.setItem("username", username);
            localStorage.setItem("confirmation_code", confirmation_code);
        };
    }, []);


    return (
        <div>
            <h1>[Вы успешно зарегистрированы]</h1>
            <p>{username}</p>
            <p>{confirmation_code}</p>
            <a href={url} target="_blank">{url}</a>
        </div>
    );
}

export default ActivationProfile;