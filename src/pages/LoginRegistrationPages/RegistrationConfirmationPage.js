import React from 'react';
import '../../styles/LoginRegistrationPages/RegistrationConfirmationPage.scss';
import {useHistory} from "react-router-dom";

const RegistrationConfirmationPage = () => {
    const history = useHistory();
    return (
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../img/LoginRegistration/photo.png')} />
            </div>
            <div className="container__form confirmation-container">
                <p>Dziękujemy</p>
                <h2> za dokonanie rejestracji!</h2>
                <h5>
                    Na podany podczas rejestracji adres email została wysłana wiadomość<br/>
                    z linkiem aktywującym twoje konto w naszym serwisie.<br/>
                    Odbierz pocztę i kliknij w link w celu aktywacji twojego konta.<br/>
                </h5>

                <button
                    className="button-link green full-width"
                    onClick={() => history.push('/login')}
                >
                    DALEJ
                </button>
            </div>
        </div>
    )
}

export default RegistrationConfirmationPage;