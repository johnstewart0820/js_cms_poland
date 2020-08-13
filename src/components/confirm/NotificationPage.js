import React from 'react';
import {Container} from "../userPanel/Container";
import '../../styles/StadiumReservationPages/ReservationConfirmation.scss';
import ButtonLink from "../../components/buttons/ButtonLink";
import {useLocation} from 'react-router-dom';

const data = {
    '/reservation-confirm' : {
        title: (props) => (
            <h1>
                Pomyślnie dokonano rezerwacji boiska:<br/>
                Nazwa {props}
            </h1>
        ),
        description: (props) => (
            <h3>
                Opłatę w wysokości 90 zł za zarezerwowany czas należy przesłać na<br/>
                konto ING nr 85 1050 1070 1000 2126 6545 4565 z podaniem imienia i<br/>
                nazwiska osoby rezerwującej oraz daty za którą dokonano opłaty.
            </h3>
        ),
        buttonText: 'ZAREJESTRUJ',
        onClick: () => {},
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
        onClick: () => {}
    }
};

const NotificationPage = props => {
    const location = useLocation();
    const item = data[location.pathname];

    return (
        <Container
            containerTitle={'REZERWACJA BOISK'}
        >
            <div className="description">
                <div className="description__inner">
                    {item.title()}
                    {item.description()}
                    <ButtonLink extra_classes="green" onClick={() => item.onClick(props)}>{item.buttonText}</ButtonLink>
                </div>
            </div>
        </Container>
    )
}

export default NotificationPage;