import React from "react";
import {Container} from "../../../components/UserPanel/Container";
import axios from '../../../extra/axios';
import '../../../styles/StadiumReservationPages/ReservationHistoryPage.scss';
import Checkbox from "../../../components/form/Checkbox";
import TourismRoutes from "../../../constants/TourismRoutes";
import Loader from "../../../components/general/Loader";
import '../../../styles/helpers/classes.scss';
import humanizedDuration from "../../../extra/humanizedDuration";

const RegisterToEventListPage = () => {
    const [notification, setNotification] = React.useState('');
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/subscriptions')
        .then((response) => {
            setData(response.data.subscriptions);
            setLoading(false);
        }).catch((error) => setNotification(error.response.data))
    }

    const cancelSubscription = id => {
        let result = window.confirm('Na pewno chcesz zrezygnować z subskrypcji wydarzenia ?');
        if (result === true) {
            axios.post(`https://api.ustron.s3.netcore.pl/subscriptions/${id}/cancel`)
                .then(() => {
                    getData()
                }).catch((error) => setNotification(error.response.data))
        }
    }

    if (!!loading) return <Container
        containerTitle={'REJESTRACJA NA ZAWODY'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'REJESTRACJA NA ZAWODY'}
            setNotofication={!!notification}
            notificationMessage={notification}
            addContainerButton={true}
            routeForContainerButton={TourismRoutes.RegisterToEventForm}
            textForContainerButton={'ZAREJESTRUJ NA ZAWODY'}
        >
            <div className="list-container">
                <div className="list-view__container">
                    <div className="list-view__list">
                        <table>
                            <thead>
                            <tr>
                                <td style={{textAlign: "left"}}>
                                    Nazwa wydarzenia
                                </td>
                                <td>
                                    Data
                                </td>
                                <td>
                                    Grupa
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
                                                label={item.event.title}
                                            />
                                        </td>
                                        <td>
                                            {item.event.custom_data.event.nearest_date.start_date}
                                        </td>
                                        <td>
                                            {item.group.name ? item.group.name : 'N/A'}
                                        </td>
                                        <td>
                                            <StatusItem/>
                                        </td>
                                        <td style={{padding: "20px 0 0 0"}}>
                                            {item.is_canceled === '0' && item.seconds_to_cancel >= 1 && <button
                                                onClick={() => cancelSubscription(item.id)}
                                                className="list-view__button">
                                                <img alt='' src={require('../../../svg/icons/cross.svg')}/>
                                            </button>}
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

export default RegisterToEventListPage;