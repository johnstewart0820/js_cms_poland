import React from 'react';
import {Container} from "../../components/userPanel/Container";
import {Col, Row} from "react-bootstrap";
import '../../styles/StadiumReservationPages/ReservationPage.scss';

const ReservationPage = () => {
   return (
       <Container
           containerTitle={'BOISKA REZERWACJA'}
       >
           <Row>
                <div className='reservation-header'>
                    <p>BOISKO/ KATEGORIA ORLIK</p>
                    <h1>
                        Boisko piłkarskie ze<br/>
                        sztuczną nawierzchnią
                    </h1>
                </div>
           </Row>
           <Row>
               <Col>

               </Col>
           </Row>
       </Container>
   )
}

export default ReservationPage;