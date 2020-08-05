import react from 'react';
import {Col, Row} from "react-bootstrap";
import InputComponent from "../form/InputComponent";
import React from "react";
import axios from '../../extra/axios';
import PasswordStrengthMeter from "../form/PasswordStrengthMeter";

export const UserProfileData = props => {
    const [password, setPassword] = React.useState(props.password || '');
    const [confirmPass, setConfirmPass] = React.useState(props.password || '');
    const [name, setName] = React.useState(props.name || '');
    const [passwordNotice, setPasswordNotice] = React.useState('');
    const [userDataNotice, setUserDataNotice] = React.useState('');

    const updateUserData = () => {
        let url = 'https://api.ustron.s3.netcore.pl/users/setInfo';
        if (name !== '') {
            axios.post(url, name)
            .then((response) => {
                console.log(response);
                setUserDataNotice('Twój profil został zaktualizowany');
            }).catch((error) => {
                alert(error.response.data);
            })
        } else {
            setUserDataNotice('Proszę wypełnić wszystkie pola ');
        }
    }

    const changePassword = () => {
        let data = {password, confirmPass};
        let url = 'https://api.ustron.s3.netcore.pl/users/setPassword';
        if (password !== '' && confirmPass !== '') {
            axios.post(url, data)
            .then((response) => {
                console.log(response);
                setPasswordNotice('Hasło zostało zmienione');
            }).catch((error) => {
                alert(error.response.data);
            })
        } else {
            alert('Proszę wypełnić wszystkie pola !');
        }
    }

    return(
        <Col className="col-md-5">
            <div className="container-inner">
                <InputComponent
                    fieldName={'NAZWA UŻYTKOWNIKA'}
                    name={'login'}
                    value={props.login}
                    disabled
                />
                <InputComponent
                    containerStyles={{margin: '15px 5px 60px 5px'}}
                    fieldName={'EMAIL'}
                    name={'email'}
                    value={props.email}
                    disabled
                />
                <div>
                    {userDataNotice}
                </div>
                <InputComponent
                    containerStyles={{marginTop: '70px'}}
                    fieldName={'IMIĘ NAZWISKO'}
                    name={'name'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div className="button-container" style={{margin: "10px 10px 0px 0px"}}>
                    <button
                        className="button-link green"
                        onClick={updateUserData}
                    >ZAPISZ</button>
                </div>
                <div>
                    {passwordNotice}
                </div>
                <InputComponent
                    containerStyles={{marginTop: "70px"}}
                    fieldName={'HASŁO'}
                    name={'password'}
                    value={password}
                    imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                    visibilitySwitch={true}
                    password={true}
                    onChange={e => setPassword(e.target.value)}
                />
                <PasswordStrengthMeter password={password}/>
                <InputComponent
                    fieldName={'POTWIERDŹ HASŁO'}
                    value={confirmPass}
                    name={'password'}
                    imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                    visibilitySwitch={true}
                    password={true}
                    onChange={e => setConfirmPass(e.target.value)}
                />
                <div className="button-container" style={{margin: "10px 10px 0px 0px"}}>
                    <button
                        className="button-link green"
                        onClick={changePassword}
                    >
                        Zmień hasło
                    </button>
                </div>
            </div>
        </Col>
    )
}