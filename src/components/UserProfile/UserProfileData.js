import react from 'react';
import {Col, Row} from "react-bootstrap";
import InputComponent from "../form/InputComponent";
import React from "react";
import axios from '../../extra/axios';
import Checkbox from "../form/Checkbox";

export const UserProfileData = props => {
    const [full_name, setName] = React.useState(props.name || '');
    const [userDataNotice, setUserDataNotice] = React.useState('');
    const [notifications_area, setNotificationsArea] = React.useState(props.notifications || []);

    const handleChange = e => {
        const value = e.target.name;
        let data = [...notifications_area];

        if (data.includes(value))
            data = data.filter(element => element !== value)
        else
            data.push(value);

        setNotificationsArea(data);
    };

    const updateUserData = () => {
        let data = {full_name, notifications_area};
        let url = 'https://api.ustron.s3.netcore.pl/users/setInfo';
        if (full_name !== '') {
            axios.post(url, data)
            .then((response) => {
                console.log(response)
                setUserDataNotice('Twój profil został zaktualizowany');
            }).catch((error) => {
                alert(error.response.data);
            })
        } else {
            setUserDataNotice('Proszę wypełnić wszystkie pola ');
        }
    }

    return(
        <>
            <Col className="col-md-5">
                <div className="container-inner">
                    <div className="user-category-header">
                        <div className="user-category__image">
                            <img alt='' src={require('../../svg/icons/user-photo.svg')}/>
                        </div>
                        <div className="user-category__text">
                            <h4>
                                {full_name}
                            </h4>
                        </div>
                    </div>
                    <Row>
                        <h4>
                            POWIADOMIENIA Z KATEGORII
                        </h4>
                    </Row>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{display: 'inline-block'}}>
                            <Checkbox
                                label={'systemowe'}
                                name={'system'}
                                checked={notifications_area.includes('system')}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={'kultura'}
                                name={'culture'}
                                checked={notifications_area.includes('culture')}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={'oświata'}
                                name={'education'}
                                checked={notifications_area.includes('education')}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={'sport'}
                                name={'sport'}
                                checked={notifications_area.includes('sport')}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label={'turystyka'}
                                name={'turism'}
                                checked={notifications_area.includes('turism')}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col>
                <div className="container-inner">
                    <InputComponent
                        fieldName={'NAZWA UŻYTKOWNIKA'}
                        name={'login'}
                        value={props.login}
                        disabled
                    />
                    <InputComponent
                        containerStyles={{margin: '15px 5px 60px 5px'}}
                        fieldName={'EMAIL'}
                        name={'email'}
                        value={props.email}
                        disabled
                    />
                    <div>
                        {userDataNotice}
                    </div>
                    <InputComponent
                        containerStyles={{marginTop: '70px'}}
                        fieldName={'IMIĘ NAZWISKO'}
                        name={'name'}
                        value={full_name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="button-container" style={{margin: "10px 10px 0px 0px"}}>
                        <button
                            className="button-link green"
                            onClick={updateUserData}
                        >
                            ZAPISZ
                        </button>
                    </div>
                </div>
            </Col>
        </>
    )
}