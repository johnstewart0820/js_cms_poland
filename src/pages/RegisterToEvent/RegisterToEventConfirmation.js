import React from "react";
import {useHistory} from "react-router-dom";
import Loader from "../../components/general/Loader";
import '../../styles/StadiumReservationPages/ReservationConfirmation.scss';
import ButtonLink from "../../components/buttons/ButtonLink";
import {Container} from "../../components/UserPanel/Container";
import TourismRoutes from "../../constants/TourismRoutes";
import '../../styles/helpers/classes.scss';

const RegisterToEventConfirmationPage = () => {
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);

    const [subscriptionData, setSubscriptionData] = React.useState(null);


    if (!!loading) return <Container
        containerTitle={'REJESTRACJA NA ZAWODY'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>


    return (
        <Container
            containerTitle={'REJESTRACJA NA ZAWODY'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
            <div className="description">
                <div className="description__inner">
                    {!subscriptionData && <Loader/>}
                    {!!subscriptionData && (
                        <>
                            <h1>
                                Pomyślnie zarejestrowano na wybrane wydarzenia<br/>
                            </h1>
                            <h3>
                                Wpisowe w wysokości 10 zł od osoby prosimy przesyłać na konto ING nr 85<br/>
                                10501070 1000 2126 6545 456 455 z podaniem imion i nazwisk osob, których<br/>
                                dotyczy opłata
                            </h3>
                            <ButtonLink extra_classes="green" onClick={() => history.push(TourismRoutes.ReservationHistoryPage)}>ZAREJESTRUJ</ButtonLink>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default RegisterToEventConfirmationPage;