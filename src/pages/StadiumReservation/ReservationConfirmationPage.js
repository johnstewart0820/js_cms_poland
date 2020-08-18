import React from "react";
import {useHistory} from "react-router-dom";
import axios from "../../extra/axios";
import Loader from "../../components/general/Loader";
import '../../styles/StadiumReservationPages/ReservationConfirmation.scss';
import ButtonLink from "../../components/buttons/ButtonLink";
import {Container} from "../../components/UserPanel/Container";
import TourismRoutes from "../../constants/TourismRoutes";

const ReservationConfirmationPage = () => {
    const history = useHistory();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const [reservationData, setReservationData] = React.useState(null);

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/courts-reservations/' + id)
            .then(response => setReservationData(response.data.reservation));
    }, []);

    return (
        <Container
            containerTitle={'REZERWACJA BOISK'}
        >
            <div className="description">
                <div className="description__inner">
                    {!reservationData && <Loader/>}
                    {!!reservationData && (
                        <>
                            <h1>
                                Pomyślnie dokonano rezerwacji boiska:<br/>
                                {reservationData.court.title}
                            </h1>
                            <h3>
                                Opłatę w wysokości {reservationData.cost} zł za zarezerwowany czas należy przesłać na<br/>
                                konto ING nr {reservationData.bank_account_number} z podaniem imienia i<br/>
                                nazwiska osoby rezerwującej oraz daty za którą dokonano opłaty.
                            </h3>
                            <ButtonLink extra_classes="green" onClick={() => history.push(TourismRoutes.ReservationHistoryPage)}>ZAREJESTRUJ</ButtonLink>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ReservationConfirmationPage;