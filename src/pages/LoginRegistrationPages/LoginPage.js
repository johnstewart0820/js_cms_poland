import React from 'react';
import '../../styles/LoginRegistrationPages/RegistrationPage.scss';
import InputComponent from "../../components/form/InputComponent";
import * as axios from "axios";
import {useHistory} from 'react-router-dom';
import User from "../../extra/User";

const LoginPage = () => {
    const history = useHistory();
    const [errors, setErrors] = React.useState([]);
    const [state, setState] = React.useState({
        login: '',
        password: '',
    });

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    const login = () => {
        let data = state;
        axios.post(
            `https://api.ustron.s3.netcore.pl/users/login`, data
        ).then((response) => {
            User.saveToken(response.data.token);
            history.push('/reservation');
        }).catch(error => {
            const responseErrors = error.response?.data?.errors;
            if (responseErrors)
                setErrors(Array.isArray(responseErrors) ? responseErrors : [responseErrors]);
            else
                setErrors(['Error sending login request']);
        });
    }

    return(
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../img/LoginRegistration/photo.png')} />
            </div>
            <div className="container__form">
                {!!errors.length && (
                    <div>
                        {errors.map(error => <>{error}<br/></>)}
                    </div>
                )}
                <p>
                    Zaloguj Się
                </p>
                <InputComponent
                    fieldName={'EMAIL'}
                    name={'login'}
                    value={state.login}
                    onChange={handleChange}
                />
                <InputComponent
                    fieldName={'HASŁO'}
                    name={'password'}
                    value={state.password}
                    imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                    containerStyles={{margin: '5px 5px 50px 5px'}}
                    password={true}
                    onChange={handleChange}
                />

                <button
                    className="button-link green full-width"
                    onClick={login}
                >
                    Zaloguj Się
                </button>

                <div className="bottom-container" style={{margin: '5px 5px -10px 5px'}}>
                    <div className="login-container">
                        <h5>Nie masz konta ? </h5><a onClick={() => history.push('/registration')}>  Zarejestruj się </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;