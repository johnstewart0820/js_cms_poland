import React from 'react';
import {UserPanel} from "../../components/userPanel/UserPanel";
import '../../styles/StadiumReservationPages/StadiumReservation.scss'
import {Card} from "../../components/StadiumReservationComponents/Card";
import {Row} from "react-bootstrap";

const StadiumReservation = () => {
    return (
       <div className="custom-container">
           <UserPanel/>
           <div className="card-container">
               <Row>
                   <h3>
                       BOISKA
                   </h3>
               </Row>
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