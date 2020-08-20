import React from 'react';
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import Card from "../../components/StadiumReservationComponents/Card";
import {Row} from "react-bootstrap";
import axios from '../../extra/axios';
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";
import {useHistory} from "react-router-dom";
import TourismRoutes from "../../constants/TourismRoutes";
import '../../styles/helpers/classes.scss';

const CourtsWithCardsPage = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/courts')
        .then((response) => {
            setData(response.data.courts);
            setLoading(false)
        }).catch(error => {
            alert(error);
        });
    },[]);

    if (!!loading) return <Container
        containerTitle={'BOISKA'}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return (
        <Container
            containerTitle={'BOISKA'}
        >
            <Row>
                {data.map((item, index) => (
                    <Card
                        key={index}
                        id={item.id}
                        name={item.title}
                        title={item.title}
                        address={item.acf.field_map_address}
                        postCode={item.acf.field_map_postcode}
                        city={item.acf.field_map_city}
                        thumbnail={'../../img/loop/1.jpg'}
                        greenButtonOnclick={() => history.push(TourismRoutes.Reservation(item.id))}
                    />
                ))}
            </Row>
        </Container>
    )
}

export default CourtsWithCardsPage;