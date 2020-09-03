import React from 'react';
import InputComponent from "../form/InputComponent";
import PasswordStrengthMeter from "../form/PasswordStrengthMeter";
import axios from "../../extra/axios";
import Col from "../helpers/Col";

export const ChangePassword = props => {
    const [password, setPassword] = React.useState(props.password || '');
    const [confirmPass, setConfirmPass] = React.useState(props.password || '');
    const [passwordNotice, setPasswordNotice] = React.useState('');

    const changePassword = () => {
        let data = {password, confirmPass};
        let url = 'https://api.ustron.s3.netcore.pl/users/setPassword';
        if (password !== '' && confirmPass !== '') {
            axios.post(url, data)
                .then((response) => {
                    setPasswordNotice('Hasło zostało zmienione');
                }).catch((error) => {
                alert(error.response.data);
            })
        } else {
            alert('Proszę wypełnić wszystkie pola !');
        }
    }

    return (
        <Col>
            <div className="container-inner">
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
                <div className="button-container" style={{margin: "10px 10px 5px 4px"}}>
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
