import React, { Component } from 'react';
import '../../../styles/LoginRegistrationPages/RegistrationPage.scss';
import PasswordStrengthMeter from "../../../components/form/PasswordStrengthMeter";
import * as axios from "axios";
import InputComponent from "../../../components/form/InputComponent";
import ButtonWithLoader from "../../../components/buttons/ButtonWithLoader";
import {useHistory} from 'react-router-dom';


const RegistrationPage = () => {
    const history = useHistory();
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [name, setName] = React.useState('');
    const [privacyPolicy, setPrivacyPolicy] = React.useState(false);
    const [userDataPolicy, setUserDataPolicy] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [notice, setNotice] = React.useState(null);

    const routeToConfirm = () => {
        if (history)
            history.push('/confirm');
    }

    const submitFormData = () => {
        if (!password && !email && !name) {
            setNotice('Proszę wypełnić wszystkie pola !');
        } else {
            if (privacyPolicy !== false && userDataPolicy !== null) {
                setIsLoading(true);
                axios.post(`https://api.ustron.s3.netcore.pl/users/register`, {
                    password: password,
                    login: email,
                    name: name
                })
                    .then((response) => {
                        if (response.status === 200) {
                            routeToConfirm();
                        }
                    }, (error) => {
                        setNotice(error.response.data.errors.join('\n'));
                    });
            } else {
                setNotice('Zaakceptuj naszą politykę prywatności !');
            }
        }
    }

    const onEnterPress = e => {
        const enterButton = e.keyCode || e.which;
        if (enterButton === 13) {
            submitFormData()
        }
    }

    return(
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../../img/LoginRegistration/photo.png')} />
            </div>
            <div className="container__form">
                {!!notice && (
                    <div className='container__form-notice'>
                        {notice}
                    </div>
                )}
                <p>
                    Zarejestruj się
                </p>
                <InputComponent
                    fieldName={'NAZWA UŻYTKOWNIKA'}
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                    name={'login'}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    containerStyles={{margin: '5px 5px 40px 5px'}}
                    fieldName={'IMIĘ NAZWISKO'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    fieldName={'EMAIL'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    fieldName={'HASŁO'}
                    visibilitySwitch={true}
                    password={true}
                    onChange={e => setPassword(e.target.value)}
                    imageSrcForSwitch={require('../../../svg/icons/passwordVisible.svg')}
                    onKeyPress={e => onEnterPress(e)}
                />

                <PasswordStrengthMeter password={password}/>

                <ButtonWithLoader
                    buttonText={'WYŚLIJ'}
                    onClick={submitFormData}
                    isLoading={isLoading}
                />

                <div className="bottom-container">
                    <div className='row'>
                        <input
                            type="checkbox"
                            value={privacyPolicy}
                            name={'privacyPolicy'}
                            onChange={e => setPrivacyPolicy(e.target.checked)}
                        />
                        <h6>
                            Oświadczam, że zapoznałem/am się z Regulaminem  i akceptuję wszystkie<br/>
                            zawarte w nim warunki.
                        </h6>
                    </div>
                    <div className='row'>
                        <input
                            type="checkbox"
                            value={userDataPolicy}
                            name={'userDataPolicy'}
                            onChange={e => setUserDataPolicy(e.target.checked)}
                        />
                        <h6>
                            Wyrażam zgodę na przetwarzanie moich danych osobowych przez Biuro<br/>
                            oraz przedstawicieli zgodnie z Ustawą o Ochronie Danych Osobowych (Dz. U.<br/>
                            1997 nr 133 poz. 883)
                        </h6>
                    </div>
                    <div className="login-container">
                        <h5>Masz konto ?</h5><button onClick={() => history.push('/login')}>  Zaloguj się</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;