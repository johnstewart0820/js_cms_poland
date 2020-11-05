import React from 'react';
import InputComponent from "../form/InputComponent";
import PasswordStrengthMeter from "../form/PasswordStrengthMeter";
import axios from "../../extra/axios";
import Col from "../helpers/Col";
import {toast} from "react-toastify";

export const ChangePassword = props => {
    const [password, setPassword] = React.useState(props.password || '');
    const [confirmPass, setConfirmPass] = React.useState(props.password || '');

    const changePassword = () => {
        let data = {password, confirmPass};
        let url = 'https://api.ustron.s3.netcore.pl/users/setPassword';
        if (password !== '' && confirmPass !== '') {
            if (password === confirmPass) {
                axios.post(url, data)
                    .then(() => {
                        toast.success("Hasło zostało zmienione", {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }).catch(() => {
                    toast.error("Wybrane hasło jest zbyt słabe", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            } else {
                toast.error("Hasla są rożne", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error("Oba pola muszą być wypełnione", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <Col extraClasses="my-profile__change-password">
            <div className="container-inner">
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
