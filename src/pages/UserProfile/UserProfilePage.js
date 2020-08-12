import React from 'react';
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import {Col, Row} from "react-bootstrap";
import '../../styles/UserProfilePage/UserProfile.scss';
import {ChangePassword} from "../../components/UserProfile/ChangePaswword";
import {Container} from "../../components/userPanel/Container";
import UserContext from "../../constants/UserContext";
import Checkbox from "../../components/form/Checkbox";
import InputComponent from "../../components/form/InputComponent";
import axios from "../../extra/axios";
import User from "../../extra/User";

const UserProfilePage = () => {
    const userContext = React.useContext(UserContext);

    const [notifications_area, setNotificationsArea] = React.useState(userContext.notifications || []);
    const [name, setName] = React.useState(userContext.name || '');
    const [userDataNotice, setUserDataNotice] = React.useState('');

    React.useEffect(() => {
        setName(userContext.name || '');
        setNotificationsArea(userContext.notifications || []);
    }, [userContext]);

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
        if (name !== '') {
            const data = {full_name: name, notifications_area};
            axios.post('https://api.ustron.s3.netcore.pl/users/setInfo', data)
                .then(() => {
                    let userData = User.getData();
                    userData.name = name;
                    User.saveData(JSON.stringify(userData));
                    userContext.login(userData);
                    setUserDataNotice('Twój profil został zaktualizowany');
                    window.scrollTo({top: 0});
                }).catch((error) => {
                    alert(error.response.data);
                });
        } else {
            setUserDataNotice('Proszę wypełnić wszystkie pola ');
        }
    }

    return (
        <Container containerTitle={'MOJ PROFIL'}>
            <Row>
                <Col className="col-md-5">
                    <div className="container-inner">
                        <div className="user-category-header">
                            <div className="user-category__image">
                                <img alt='' src={require('../../svg/icons/user-photo.svg')}/>
                            </div>
                            <div className="user-category__text">
                                <h4>
                                    {userContext.name}
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
                            value={userContext.email}
                            disabled
                        />
                        <InputComponent
                            containerStyles={{margin: '15px 5px 60px 5px'}}
                            fieldName={'EMAIL'}
                            name={'email'}
                            value={userContext.email}
                            disabled
                        />
                        <div>
                            {userDataNotice}
                        </div>
                        <InputComponent
                            containerStyles={{marginTop: '70px'}}
                            fieldName={'IMIĘ NAZWISKO'}
                            name={'name'}
                            value={name}
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
                <ChangePassword/>
            </Row>
        </Container>
    )
}

export default UserProfilePage;