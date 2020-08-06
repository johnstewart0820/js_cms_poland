import React from 'react';
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import Card from "../../components/StadiumReservationComponents/Card";
import {Row} from "react-bootstrap";
import axios from '../../extra/axios';
import {Container} from "../../components/userPanel/Container";

const StadiumReservation = () => {
    const [data, setData] = React.useState();

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/courts-reservations')
        .then(({response}) => {
            setData(response);
        }).catch(error => {
            alert(error.response.data.errors);
        });
    },[]);

    return (
        <Container
            containerTitle={'BOISKA'}
        >
            <Row>
                <Card
                    headerImageSource={require('../../img/loop/1.jpg')}
                    title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                    address={'43-450 Ustroń ul. Zabytkowa 23'}
                />
                <Card
                    headerImageSource={require('../../img/loop/1.jpg')}
                    title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                    address={'43-450 Ustroń ul. Zabytkowa 23'}
                />
                <Card
                    headerImageSource={require('../../img/loop/1.jpg')}
                    title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                    address={'43-450 Ustroń ul. Zabytkowa 23'}
                />
                <Card
                    headerImageSource={require('../../img/loop/1.jpg')}
                    title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                    address={'43-450 Ustroń ul. Zabytkowa 23'}
                />
            </Row>
        </Container>
    )
}

export default StadiumReservation;