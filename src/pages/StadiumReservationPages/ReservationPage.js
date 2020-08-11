import React from 'react';
import {Container} from "../../components/userPanel/Container";
import {Col, Row} from "react-bootstrap";
import '../../styles/StadiumReservationPages/ReservationPage.scss';
import {Calendar} from "react-calendar";
import '../../styles/Calendar/Calendar.scss';
import InputComponent from "../../components/form/InputComponent";
import DayButton from "../../components/StadiumReservationComponents/DayButton";
import RadioButton from "../../components/form/RadioButton";
import axios from '../../extra/axios';

const ReservationPage = () => {
    const [data, setData] = React.useState({});
    const [customData, setCustomData] = React.useState({});

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/courts/7?lang=pl')
            .then((response) => {
                setCustomData(JSON.parse(response.data.court.custom_data.courts));
                setData(response.data.court);
            }).catch(error => {
                alert(error);
        });
    },[]);


    return (
       <Container
           containerTitle={'BOISKA REZERWACJA'}
       >
           <Row>
                <div className='reservation-header'>
                    <p>BOISKO/ KATEGORIA ORLIK</p>
                    <h1>
                        {data.title}
                    </h1>
                </div>
           </Row>
           <Row>
               <div style={{display: "flex", padding: "30px 10px 60px 100px"}}>
                   <Col>
                       <div className="calendar-container">
                           <InputComponent
                               fieldName={'DATA'}
                               containerStyles={{margin: '40px 0px 10px 0px', borderColor: '#85CB3F'}}
                           />
                           <Calendar
                               className='calendar'
                           />
                           <h4>
                               Prosimy o zapoznanie się z limitem dotyczącym rezerwacji dla<br/>
                               jednego użytkownika. Szczegółowo opisany w regulaminie.
                           </h4>
                       </div>
                   </Col>
                   <Col>
                       <div style={{position: 'relative', left: '40px'}}>
                           <Row>
                               <DayButton/>
                               <DayButton/>
                               <DayButton/>
                               <DayButton/>
                           </Row>
                           <Row>
                               <div style={{margin: '20px'}}>
                                   {console.log(customData.hours)}
                                   <h3>
                                       Dostępne godziny rezerwacji
                                   </h3>
                                   <div style={{display: 'flex', flexDirection: 'column'}}>
                                       <RadioButton
                                            label={'10:00'}
                                       />
                                       <RadioButton
                                           containerStyles={{marginTop: '15px'}}
                                           label={'10:00'}
                                       />
                                       <RadioButton
                                           containerStyles={{marginTop: '15px'}}
                                           label={'10:00'}
                                       />
                                       <RadioButton
                                           containerStyles={{marginTop: '15px'}}
                                           label={'10:00'}
                                       />
                                   </div>
                               </div>
                           </Row>
                       </div>
                   </Col>
               </div>
           </Row>
       </Container>
    )
}

export default ReservationPage;