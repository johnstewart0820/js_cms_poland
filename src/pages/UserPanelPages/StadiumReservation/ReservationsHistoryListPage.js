import React from 'react';
import {Container} from "../../../components/UserPanel/Container";
import axios from '../../../extra/axios';
import '../../../styles/StadiumReservationPages/ReservationHistoryPage.scss';
import Checkbox from "../../../components/form/Checkbox";
import TourismRoutes from "../../../constants/TourismRoutes";
import Loader from "../../../components/general/Loader";
import '../../../styles/helpers/classes.scss';
import humanizedDuration from "../../../extra/humanizedDuration";
import ButtonX from "../../../components/buttons/ButtonX";

const ReservationHistoryPage = () => {
    const [data, setData] = React.useState([]);
    const [notification, setNotification] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/courts-reservations')
        .then((response) => {
            setData(response.data.reservations);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setNotification(error.response.data)
        });
    };

    const cancelReservation = id => {
        let result = window.confirm('Czy na pewno chcesz anulować rezerwację?');
        if(result === true) {
            axios.post(`https://api.ustron.s3.netcore.pl/courts-reservations/${id}/cancel`)
            .then(() => {
                getData()
            }).catch((error) => setNotification(error.response.data));
        }
    };

    if (!!loading) {
        return (
            <Container
                containerTitle={'BOISKA HISTORIA REZERWACJI'}
                setNotification={!!notification && true}
                notificationMessage={notification}
            >
                <div className="loader-container">
                    <Loader/>
                </div>
            </Container>
        );
    }

    return(
        <Container
            setNotification={!!notification && true}
            notificationMessage={notification}
            addContainerButton={true}
            routeForContainerButton={TourismRoutes.StadiumReservation}
            textForContainerButton={'ZAREZERWUJ BOISKO'}
            containerTitle={'BOISKA HISTORIA REZERWACJI'}>
            <div className="list-container">
                <div className="list-view__container">
                    <div className="list-view__list">
                        <table>
                            <thead>
                                <tr>
                                    <td style={{textAlign: "left"}}>
                                        Nazwa boiska
                                    </td>
                                    <td>
                                        Czas trwania
                                    </td>
                                    <td>
                                        Godzina rezerwacji
                                    </td>
                                    <td>
                                        Data
                                    </td>
                                    <td>
                                        Status
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                let timeToCancel = humanizedDuration(item.seconds_to_cancel);
                                let result = 'Pozostało ' + timeToCancel + ' na dokonanie wpłaty';

                                const StatusItem = () => {
                                    if (item.seconds_to_cancel <= 0) {
                                        return <p style={{opacity: '0.7'}}>Wygasłe/anulowane</p>
                                    } else {
                                        if (item.is_canceled === '0' && item.confirmed === '0') {
                                            return <p style={{color: 'red'}}>{result}</p>
                                        } else if (item.confirmed === '1' && item.is_canceled === '0') {
                                            return <h5>Opłacone</h5>
                                        } else {
                                            return <p style={{opacity: '0.7'}}>Wygasłe/anulowane</p>
                                        }
                                    }
                                }
                                return(
                                    <tr key={index}>
                                        <td>
                                            <Checkbox
                                                labelRight={true}
                                                label={item.court.title}
                                            />
                                        </td>
                                        <td>
                                            {item.minutes + ' min'}
                                        </td>
                                        <td>
                                            {item.time_frame }
                                        </td>
                                        <td>
                                            {item.day}
                                        </td>
                                        <td>
                                            <StatusItem/>
                                        </td>
                                        <td style={{padding: "20px 0 0 0"}}>
                                            {item.is_canceled === '0' && item.seconds_to_cancel >= 1 && (
                                                <ButtonX onClick={() => cancelReservation(item.id)}/>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ReservationHistoryPage;