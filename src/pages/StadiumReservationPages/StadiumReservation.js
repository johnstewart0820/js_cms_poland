import React from 'react';
import {UserPanel} from "../../components/userPanel/UserPanel";
import '../../styles/StadiumReservationPages/StadiumReservation.scss'
import Card from "../../components/StadiumReservationComponents/Card";
import {Row} from "react-bootstrap";
import * as axios from "axios";

const StadiumReservation = () => {
    const [data, setData] = React.useState();

    React.useEffect(() => {
        axios.get(
            'https://api.ustron.s3.netcore.pl/courts-reservations'
        )
        .then(({response}) => {
            setData(response);
        }, (error) => {
            alert(error.response.data.errors);
        });
    }, []);

    return (
       <div className="custom-container">
           <UserPanel/>
           <div className="card-container">
               <div className="page-title">
                   <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                   <h3>
                       BOISKA
                   </h3>
               </div>
               <Row>
                   <Card
                        headerImageSource={require('../../img/loop/1.jpg')}
                        title={'Boisko piłkarskie ze sztuczną nawierzchnią'}
                        address={'43-450 Ustroń ul. Zabytkowa 23'}
                   />
               </Row>
           </div>
       </div>
    )
}

export default StadiumReservation;