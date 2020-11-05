import React from 'react';
import '../../../styles/StadiumReservationPages/StadiumReservation.scss';
import '../../../styles/UserProfilePage/UserProfile.scss';
import {ChangePassword} from "../../../components/UserProfile/ChangePaswword";
import {Container} from "../../../components/UserPanel/Container";
import UserContext from "../../../constants/UserContext";
import Checkbox from "../../../components/form/Checkbox";
import InputComponent from "../../../components/form/InputComponent";
import axios from "../../../extra/axios";
import User from "../../../extra/User";
import Loader from "../../../components/general/Loader";
import '../../../styles/helpers/classes.scss';
import Row from "../../../components/helpers/Row";
import Col from "../../../components/helpers/Col";
import {API, API_URL} from "../../../extra/API";
import LocalStorage from "../../../constants/LocalStorage";
import {toast, ToastContainer} from "react-toastify";


const UserProfilePage = () => {
    const userContext = React.useContext(UserContext);

    const [notifications_area, setNotificationsArea] = React.useState( userContext.notifications||[]);
    const [name, setName] = React.useState(JSON.parse(localStorage.getItem(LocalStorage.UserToken)).name||"");
    const [loading, setLoading] = React.useState(true);


    const handleChange = e => {
        const value = e.target.name;
        let data = [...notifications_area];

        if (data.includes(value))
            data = data.filter(element => element !== value)
        else {
          data.push(value);
        }
        setNotificationsArea(data);
    };
    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/users/getInfo').then(res => {
            setLoading(false);
            setNotificationsArea(res.data.info.notifications_area)
        })
    }, [])

    const updateUserData = () => {
        if (name !== '') {
            const data = {full_name: name, notifications_area};
            axios.post(`${API_URL}users/setInfo`, data)
                .then(() => {
                    setNotificationsArea(notifications_area)
                    let userData = User.getData();
                    userData.name = name;
                    User.saveData(JSON.stringify(userData));
                    userContext.login(userData);
                    toast.success('Twój profil został zaktualizowany', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }).catch(() => {
                toast.error("Pole 'imie nazwisko' musi zawierać minimum 6 liter", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        } else {
            toast.error("Proszę wypełnić pole 'imie nazwisko'", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    if (!!loading) return <Container
        containerTitle={'MOJ PROFIL'}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return (
        <Container
            containerTitle={'MOJ PROFIL'}>
            <Row>
                <Col extraClasses="my-profile__notifications">
                    <div className="container-inner">
                        <div className="user-category-header">
                            <div className="user-category__image">
                                <img alt='' src={require('../../../svg/icons/user-photo.svg')}/>
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
                                    containerStyles={{marginTop: '20px'}}
                                    labelRight={true}
                                    label={'systemowe'}
                                    name={'system'}
                                    checked={notifications_area.includes('system')}
                                    onChange={handleChange}
                                />
                                <Checkbox
                                    containerStyles={{marginTop: '20px'}}
                                    labelRight={true}
                                    label={'kultura'}
                                    name={'culture'}
                                    checked={notifications_area.includes('culture')}
                                    onChange={handleChange}
                                />
                                <Checkbox
                                    containerStyles={{marginTop: '20px'}}
                                    labelRight={true}
                                    label={'oświata'}
                                    name={'education'}
                                    checked={notifications_area.includes('education')}
                                    onChange={handleChange}
                                />
                                <Checkbox
                                    containerStyles={{marginTop: '20px'}}
                                    labelRight={true}
                                    label={'sport'}
                                    name={'sport'}
                                    checked={notifications_area.includes('sport')}
                                    onChange={handleChange}
                                />
                                <Checkbox
                                    containerStyles={{marginTop: '20px'}}
                                    labelRight={true}
                                    label={'turystyka'}
                                    name={'turism'}
                                     checked={notifications_area.includes('turism')}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <ToastContainer/>
                <Col extraClasses="my-profile__edit">
                    <div className="container-inner">
                        <InputComponent
                            fieldName={'EMAIL'}
                            name={'email'}
                            value={JSON.parse(localStorage.getItem(LocalStorage.UserToken)).email}
                            disabled
                        />
                        <InputComponent
                            placeholder={JSON.parse(localStorage.getItem(LocalStorage.UserToken)).name}
                            maxLength={'40'}
                            containerStyles={{marginTop: '70px'}}
                            fieldName={'IMIĘ NAZWISKO'}
                            name={'name'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="button-container" style={{margin: "10px 10px 5px 4px"}}>
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