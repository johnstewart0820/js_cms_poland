import React from 'react';
import ButtonLink from "../../components/buttons/ButtonLink";
import {useLocation, useHistory} from 'react-router-dom';
import TourismRoutes from "../../constants/TourismRoutes";
import PropTypes from 'prop-types';

const data = {
    '/reservation-confirm' : {
        title: (props) => (
            <h1>
                Pomyślnie dokonano rezerwacji boiska:<br/>
                Nazwa
            </h1>
        ),
        description: (props) => (
            <h3>
                Opłatę w wysokości 90 zł za zarezerwowany czas należy przesłać na<br/>
                konto ING nr {props.cardNum} z podaniem imienia i<br/>
                nazwiska osoby rezerwującej oraz daty za którą dokonano opłaty.
            </h3>
        ),
        buttonText: 'ZAREJESTRUJ',
        onClick: (props) => {props.history.push(TourismRoutes.ReservationHistoryPage)}
    },
    '/confirm' : {
        title: () => (
            <>
                <p>Dziękujemy</p>
                <h2> za dokonanie rejestracji!</h2>
            </>
        ),
        description: () => (
            <h5>
                Na podany podczas rejestracji adres email została wysłana wiadomość<br/>
                z linkiem aktywującym twoje konto w naszym serwisie.<br/>
                Odbierz pocztę i kliknij w link w celu aktywacji twojego konta.<br/>
            </h5>
        ),
        buttonText: 'DALEJ',
        onClick: (props) => console.log(props.history)
    }
};

const TitleDescriptionButton = props => {
    const location = useLocation();
    const item = data[location.pathname];
    const history = useHistory();

    const args = {...props, history};

    return (
        <div className="description">
            <div className="description__inner">
                {props.title}
                {props.description}
                <ButtonLink extra_classes="green" onClick={props.onClick}>{props.buttonText}</ButtonLink>
            </div>
        </div>
    );
};

TitleDescriptionButton.propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    buttonText: PropTypes.node,
    onClick: PropTypes.func,
};

export default TitleDescriptionButton;