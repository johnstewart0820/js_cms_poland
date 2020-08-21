import React from "react";
import {useHistory} from "react-router-dom";
import Loader from "../../components/general/Loader";
import '../../styles/StadiumReservationPages/ReservationConfirmation.scss';
import ButtonLink from "../../components/buttons/ButtonLink";
import {Container} from "../../components/UserPanel/Container";
import TourismRoutes from "../../constants/TourismRoutes";
import '../../styles/helpers/classes.scss';
import axios from "../../extra/axios";

const RegisterToEventConfirmationPage = () => {
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);
    const [subscriptionData, setSubscriptionData] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/subscriptions/${id}`)
            .then((res) => {
                setSubscriptionData(res.data.subscription);
                setLoading(false);
            })
    },[])


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
                    {console.log(subscriptionData)}
                    {!subscriptionData && <Loader/>}
                    {!!subscriptionData && (
                        <>
                            <h1>
                                Pomyślnie zarejestrowano na wybrane wydarzenia<br/>
                            </h1>
                            <h3>
                                Wpisowe w wysokości {subscriptionData.cost} zł od osoby prosimy przesyłać na konto ING<br/>
                                nr {subscriptionData.bank_account_number} z podaniem imion i nazwisk osob, których<br/>
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