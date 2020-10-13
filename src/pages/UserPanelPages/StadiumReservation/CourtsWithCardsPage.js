import React from 'react';
import '../../../styles/StadiumReservationPages/StadiumReservation.scss';
import Card from "../../../components/StadiumReservationComponents/Card";
import axios from '../../../extra/axios';
import {Container} from "../../../components/UserPanel/Container";
import Loader from "../../../components/general/Loader";
import {useHistory} from "react-router-dom";
import TourismRoutes from "../../../constants/TourismRoutes";
import '../../../styles/helpers/classes.scss';
import Row from "../../../components/helpers/Row";

const CourtsWithCardsPage = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});
    const [notification, setNotification] = React.useState(null);

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/courts')
        .then((response) => {
            setData(response.data.courts);
            setLoading(false)
        }).catch(error => {
            setNotification(error.response?.data);
        });
    },[]);

    if (!!loading) return <Container
        containerTitle={'BOISKA'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return (
        <Container
            containerTitle={'BOISKA'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
            <Row>
                {data.map((item, index) => {
                    let newItem = item.acf;
                    return (
                        <Card
                            key={index}
                            onClickGreenButton={() => history.push(TourismRoutes.Reservation(item.id))}
                            {...item}
                            {...newItem}
                        />
                    )
                })}
            </Row>
        </Container>
    )
}

export default CourtsWithCardsPage;