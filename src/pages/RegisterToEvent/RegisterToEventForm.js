import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Select from "../../components/form/Select";
import '../../styles/RegisterToEvent/RegisterToEventForm.scss';
import InputComponent from "../../components/form/InputComponent";
import {Col, Row} from "react-bootstrap";

const RegisterToEvent = () => {
    const [userName, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [event, setEvent] = React.useState('');
    const [nationality, setNationality] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [group, setGroup] = React.useState('');
    const [cityCode, setCityCode] = React.useState('');
    const [address, setAddress] = React.useState('');

    return(
        <Container
            containerTitle={'REJESTRACJA NA ZAWODY'}
        >
            <div className="container-inner">
                <div className="container-inner__body">
                    <Select extra_classes={'gray-input margin-bottom'} label={'REJESTRACJA NA ZAWODY'} name={'registrationToEvent'}/>
                    <InputComponent containerStyles={{minHeight: '60px', maxWidth: '806px'}} fieldName={'NAZWISKO IMIĘ'} name={'userName'}/>
                    <InputComponent containerStyles={{minHeight: '60px', width: '398px', marginBottom: '50px'}} fieldName={'E-MAIL'} name={'email'}/>
                    <Row>
                        <Col>
                            <Select extra_classes={'gray-input'} label={'NARODOWOŚĆ'} name={'country'}/>
                            <Select extra_classes={'gray-input'} label={'PLEC'} name={'gender'}/>
                        </Col>
                        <Col>
                            <InputComponent containerStyles={{minHeight: '60px', margin: '10px 5px'}} fieldName={'DATA URODZENIA'} name={'birthDate'}/>
                            <Select extra_classes={'gray-input'} label={'GRUPA'} name={'group'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputComponent containerStyles={{minHeight: '60px', marginTop: '50px'}} fieldName={'KOD MIASTA'} name={'cityCode'}/>
                        </Col>
                        <Col>
                            <InputComponent containerStyles={{minHeight: '60px', marginTop: '50px'}} fieldName={'ULICA, NR, DOMU'} name={'address'}/>
                        </Col>
                    </Row>
                    <Row>
                        <button
                            className="button-link green full-width"
                            onClick={() => console.log()}
                        >ZAREJESTRUJ</button>
                    </Row>
                </div>
            </div>
        </Container>
    )
}

export default RegisterToEvent;