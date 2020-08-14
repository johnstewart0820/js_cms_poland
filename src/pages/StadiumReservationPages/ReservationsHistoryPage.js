import React from 'react';
import {Container} from "../../components/userPanel/Container";
import axios from '../../extra/axios';
import '../../styles/StadiumReservationPages/ReservationHistoryPage.scss';
import Checkbox from "../../components/form/Checkbox";
import {useLocation} from "react-router-dom";

const ReservationHistoryPage = () => {
    const location = useLocation();
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/courts-reservations')
            .then((response) => {
                setData(response.data.reservations);
            }).catch((error) => setError(error))
    }

    const cancelReservation = id => {
        axios.post(`https://api.ustron.s3.netcore.pl/courts-reservations/${id}/cancel`)
        .then((response) => {
            console.log(response);
            getData()
        }).catch((error) => setError(error))
    }

    return(
        <Container
            notificationMessage={error}
            containerTitle={'BOISKA HISTORIA REZERWACJI'}>
            <div className="list-container">
                <div className="list-view__container">
                    <div className="list-view__list">
                        <table>
                            {console.log(location.pathname)}
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
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Checkbox
                                        labelRight={true}
                                        label={item.court.title}
                                        />
                                    </td>
                                    <td>
                                        {item.time_frame}
                                    </td>
                                    <td>
                                        {item.time_frame }
                                    </td>
                                    <td>
                                        {item.day}
                                    </td>
                                    <td>
                                        {item.confirmed === '1' && 'opłacone'}
                                        {item.is_canceled === '1' && 'Wygasłe/anulowane'}
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
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ReservationHistoryPage;