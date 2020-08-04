import React from 'react';
import {UserPanel} from "../../components/userPanel/UserPanel";
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import InputComponent from "../../components/form/InputComponent";
import {Col, Row} from "react-bootstrap";
import '../../styles/UserProfilePage/UserProfile.scss';
import {UserPanelHeader} from "../../components/userPanel/UserPanelHeader";
import Checkbox from "../../components/form/Checkbox";

const UserProfilePage = () => {
    return(
        <div className="custom-container">
            <UserPanel/>
            <Row>
                <h4>
                    Moj profil
                </h4>
            </Row>
            <Row>
                <Col className="col-md-5">
                    <div className="container-inner">
                        <UserPanelHeader/>
                        <Checkbox
                            label={'systemowe'}
                        />
                        <Checkbox
                            label={'kultura'}
                        />
                        <Checkbox
                            label={'oświata'}
                        />
                        <Checkbox
                            label={'sport'}
                        />
                        <Checkbox
                            label={'turystyka'}
                        />
                    </div>
                </Col>
                <Col className="col-md-5">
                    <div className="container-inner">
                        <InputComponent
                            fieldName={'NAZWA UŻYTKOWNIKA'}
                            name={'login'}
                        />
                        <InputComponent
                            containerStyles={{margin: '5px 5px 40px 5px'}}
                            fieldName={'IMIĘ NAZWISKO'}
                            name={'name'}
                        />
                        <InputComponent
                            containerStyles={{marginTop: '70px', marginBottom: '80px'}}
                            fieldName={'EMAIL'}
                            name={'email'}
                        />
                        <InputComponent
                            fieldName={'HASŁO'}
                            type={'password'}
                            inputImage={true}
                            imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                        />
                        <button className="button-link green">ZAPISZ</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserProfilePage;