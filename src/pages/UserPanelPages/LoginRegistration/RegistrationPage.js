import React, {Component} from 'react';
import '../../../styles/LoginRegistrationPages/RegistrationPage.scss';
import PasswordStrengthMeter from "../../../components/form/PasswordStrengthMeter";
import * as axios from "axios";
import InputComponent from "../../../components/form/InputComponent";
import ButtonWithLoader from "../../../components/buttons/ButtonWithLoader";
import {useHistory} from 'react-router-dom';
import {API_URL} from "../../../extra/API";
import Loader from "../../../components/general/Loader";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const [passwordIsEmpty, setPasswordIsEmpty] = React.useState(false);
    const [nameIsEmpty, setNameIsEmpty] = React.useState(false);
    const [emailIsEmpty, setEmailIsEmpty] = React.useState(false);
    const [privacyPolicyIsEmpty, setPrivacyPolicyIsEmpty] = React.useState(false);
    const [userDataPolicyIsEmpty, setUserDataPolicyIsEmpty] = React.useState(false);

    const routeToConfirm = () => {
        setIsLoading(true)
        if (history)
            history.push('/confirm');
    }

    const submitFormData = () => {
        if (!password && !email && !name) {

            toast.error("Każde pole musi być wypełnione!", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setPasswordIsEmpty(true)
            setEmailIsEmpty(true)
            setNameIsEmpty(true)

        } else {

            setPasswordIsEmpty(password.length === 0 ? true : false);
            setEmailIsEmpty(email.length === 0 ? true : false);
            setNameIsEmpty(name.length === 0 ? true : false);

            if (privacyPolicy !== false && userDataPolicy !== null) {
                setPrivacyPolicyIsEmpty(false);
                setUserDataPolicyIsEmpty(false);

                axios.post(`${API_URL}users/register`, {
                    password: password,
                    login: email,
                    name: name,
                })
                    .then((response) => {
                        setIsLoading(true);
                        if (response.status === 200) {
                           setTimeout(()=>routeToConfirm(),1500)
                        }
                    }, (error) => {
                        toast.error(error.response.data.errors.join('\n'), {
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            } else {
                if (privacyPolicy === false) setPrivacyPolicyIsEmpty(true);
                if (!userDataPolicy ) setUserDataPolicyIsEmpty(true);
                toast.info("Zaakceptuj naszą politykę prywatności", {
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
    }

    const onEnterPress = e => {
        const enterButton = e.keyCode || e.which;
        if (enterButton === 13) {
            submitFormData()
        }
    }

    return (
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../../img/LoginRegistration/photo.png')}/>
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
                    containerStyles={{
                        margin: '5px 5px 40px 5px',
                        borderColor: nameIsEmpty ?'red': '#d2d2d2'
                    }}
                    fieldName={'NAZWA UŻYTKOWNIKA'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    fieldName={'EMAIL'}
                    containerStyles={{borderColor: emailIsEmpty ?'red': '#d2d2d2' }}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    fieldName={'HASŁO'}
                    containerStyles={{borderColor: passwordIsEmpty ? 'red':'#d2d2d2'  }}
                    visibilitySwitch={true}
                    password={true}
                    onChange={e => setPassword(e.target.value)}
                    imageSrcForSwitch={require('../../../svg/icons/passwordVisible.svg')}
                    onKeyPress={e => onEnterPress(e)}
                />

                <PasswordStrengthMeter password={password}/>
                <ButtonWithLoader
                    buttonText={'utwórz konto'}
                    onClick={submitFormData}
                    isLoading={isLoading}
                />
                <ToastContainer/>

                <div className="bottom-container">
                    <div className='row' >
                        <input
                            type="checkbox"
                            value={privacyPolicy}
                            name={'privacyPolicy'}
                            onChange={e => setPrivacyPolicy(e.target.checked)}
                        />
                        <h6 style={{color: privacyPolicyIsEmpty ? 'red':'#3D5567' }}>
                            Oświadczam, że zapoznałem/am się z Regulaminem i akceptuję wszystkie<br/>
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
                        <h6 style={{color: userDataPolicyIsEmpty ? 'red':'#3D5567' }}>
                            Wyrażam zgodę na przetwarzanie moich danych osobowych przez Biuro<br/>
                            oraz przedstawicieli zgodnie z Ustawą o Ochronie Danych Osobowych (Dz. U.<br/>
                            1997 nr 133 poz. 883)
                        </h6>
                    </div>
                    <div className="login-container">
                        <h5>Masz konto ?</h5>
                        <button onClick={() => history.push('/login')}> Zaloguj się</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;