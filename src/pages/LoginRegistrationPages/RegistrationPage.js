import React, { Component } from 'react';
import '../../styles/LoginRegistrationPages/RegistrationPage.scss';
import PasswordStrengthMeter from "../../components/auth/PasswordStrengthMeter";
import * as axios from "axios";
import InputComponent from "../../components/form/InputComponent";

export default class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordVisible: false,
            emailIsValid: null,
            email: '',
            login: '',
            name: '',
            windowLocation: '',
            privacyPolicy: false,
            userDataPolicy: false
        }
    }

    render() {
        const {history} = this.props;
        const {password, email, login, name, privacyPolicy, userDataPolicy} = this.state;
        return(
            <div className="registration-container" style={{padding: 0}}>
                <div className="container__photo">
                    <img alt='' src={require('../../img/LoginRegistration/photo.png')} />
                </div>
                <div className="container__form">
                    <p>
                        Zarejestruj się
                    </p>
                    <InputComponent
                        fieldName={'NAZWA UŻYTKOWNIKA'}
                        inputHandler={this.handleInputChange}
                        value={login}
                        name={'login'}
                    />
                    <InputComponent
                        containerStyles={{margin: '5px 5px 40px 5px'}}
                        fieldName={'IMIĘ NAZWISKO'}
                        inputHandler={this.handleInputChange}
                        value={name}
                        name={'name'}
                    />
                    <InputComponent
                        fieldName={'EMAIL'}
                        inputHandler={this.handleInputChange}
                        value={email}
                        name={'email'}
                    />
                    <InputComponent
                        fieldName={'HASŁO'}
                        type={this.state.passwordVisible === true ? 'text' : 'password'}
                        switchHandler={this.visibilityPasswordSwitch}
                        inputHandler={e => this.setState({password: e.target.value})}
                        inputImage={true}
                        imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                    />

                    <PasswordStrengthMeter password={password}/>

                    <button className="button-link green full-width" onClick={this.submitFormData}>WYŚLIJ</button>

                    <div className="bottom-container">
                        <div className='row'>
                            <input
                                type="checkbox"
                                value={privacyPolicy}
                                name={'privacyPolicy'}
                                onChange={this.handleInputChange}
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
                                onChange={this.handleInputChange}
                            />
                            {console.log(userDataPolicy, privacyPolicy)}
                            <h6>
                                Wyrażam zgodę na przetwarzanie moich danych osobowych przez Biuro<br/>
                                oraz przedstawicieli zgodnie z Ustawą o Ochronie Danych Osobowych (Dz. U.<br/>
                                1997 nr 133 poz. 883)
                            </h6>
                        </div>
                        <div className="login-container">
                            <h5>Masz konto ?</h5><a onClick={() => history.push('/login')}>  Zaloguj się</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    routeToConfirm = () => {
        const {history} = this.props;
        if (history)
            history.push('/confirm');
    }

    submitFormData = () => {
        let {password, email, name, privacyPolicy, userDataPolicy} = this.state;
        if (!password && !email && !name) {
            alert('Proszę wypełnić wszystkie pola !');
        } else {
            if (privacyPolicy !== false && userDataPolicy !== null) {
                axios.post(`https://api.ustron.s3.netcore.pl/users/register`, {
                    password: password,
                    login: email,
                    name: name
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            this.routeToConfirm();
                        }
                    }, (error) => {
                        alert(error.response.data.errors.join('\n'));
                    });
            } else {
                alert('Zaakceptuj naszą politykę prywatności !');
            }
        }
    }

    visibilityPasswordSwitch = () => {
        if (this.state.passwordVisible === false) {
            this.setState({
                passwordVisible: true
            })
        } else {
            this.setState({
                passwordVisible: false
            })
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'email') {
            this.emailIsValid(value);
        } else {
            this.setState({
                emailIsValid: false
            })
        }
        this.setState({
            [name]: value
        })
    }

    emailIsValid  = (email) => {
        this.setState({
            emailIsValid: true
        })
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
}