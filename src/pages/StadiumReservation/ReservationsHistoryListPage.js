import React from 'react';
import {Container} from "../../components/UserPanel/Container";
import axios from '../../extra/axios';
import '../../styles/StadiumReservationPages/ReservationHistoryPage.scss';
import Checkbox from "../../components/form/Checkbox";
import TourismRoutes from "../../constants/TourismRoutes";

const ReservationHistoryPage = () => {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/courts-reservations')
        .then((response) => {
            setData(response.data.reservations);
        }).catch((error) => console.log(error))
    }

    const cancelReservation = id => {
        let result = window.confirm('Czy na pewno chcesz anulować rezerwację?');
        if(result === true) {
            axios.post(`https://api.ustron.s3.netcore.pl/courts-reservations/${id}/cancel`)
            .then(() => {
                getData()
            }).catch((error) => setError(error))
        }
    }

    return(
        <Container
            setNotification={!!error}
            notificationMessage={error}
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
                                        Action
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                let timeToCancel = item.seconds_to_cancel;
                                let day, hour, minute, seconds;
                                seconds = Math.floor(timeToCancel / 100);
                                minute = Math.floor(seconds / 6);
                                seconds = seconds % 6;
                                hour = Math.floor(minute / 6);
                                minute = minute % 6;
                                day = Math.floor(hour / 24);
                                hour = hour % 24;
                                let result = 'pozostało ' + (day > 1 ? day + ' dni ' : day + ' dzień ') + (hour > 1 ? hour + ' godzin' : hour + ' godzina') + ' na dokonanie wpłaty';

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
                                            {item.is_canceled === '0' && item.confirmed === '0' && <p style={{color: 'red'}}>{result}</p>}
                                            {item.confirmed === '1' && item.is_canceled === '0' && <h5>Opłacone</h5>}
                                            {item.is_canceled === '1' && <p style={{opacity: '0.7'}}>Wygasłe/anulowane</p>}
                                        </td>
                                        <td style={{padding: "20px 0 0 0"}}>
                                            {item.is_canceled === '0' && (
                                                <button
                                                    onClick={() => cancelReservation(item.id)}
                                                    className="list-view__button">
                                                    <img alt='' src={require('../../svg/icons/cross.svg')}/>
                                                </button>
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