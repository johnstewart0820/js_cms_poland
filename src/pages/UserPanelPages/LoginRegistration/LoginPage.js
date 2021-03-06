import React from 'react';
import '../../../styles/LoginRegistrationPages/RegistrationPage.scss';
import InputComponent from "../../../components/form/InputComponent";
import axios from '../../../extra/axios';
import {useHistory} from 'react-router-dom';
import User from "../../../extra/User";
import UserContext from "../../../constants/UserContext";
import PlanerContext from "../../../constants/PlanerContext";
import ButtonWithLoader from "../../../components/buttons/ButtonWithLoader";
import {API_URL} from "../../../extra/API";
import TourismRoutes from "../../../constants/TourismRoutes";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useCookies} from 'react-cookie';

const LoginPage = () => {
    const history = useHistory();
    const planerContext = React.useContext(PlanerContext);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [emptyLogin, setEmptyLogin] = React.useState(false);
    const [emptyPassword, setEmptyPassword] = React.useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [state, setState] = React.useState({
        login: '',
        password: '',
    });
    const user = React.useContext(UserContext);
    let token = '';

    React.useEffect(() => {
        planerContext.setVisible(false);
    }, []);

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    }

    const loginUser = () => {
        let userData = state;
        localStorage.clear()
        axios.post(
            `${API_URL}users/login`, userData,
        ).then((response) => {
            token = response.data.token;
            setLoading(true);
            setCookie('token', token,
                {path: '/', domain: '.netcore.pl',expires : new Date(2050,10,10)});
        }).then(getUserData).catch(error => {
            const responseErrors = error.response?.data?.errors;

            setEmptyLogin(state.login === "" ? true : false);
            setEmptyPassword(state.password === "" ? true : false);

            if (state.password === "" || state.login === "") {
                toast.info("Oba pola musz?? by?? wype??nione", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            if (responseErrors) {
                toast.error(responseErrors, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                removeCookie('token',
                    {path: '/', domain: '.netcore.pl', expires : new Date(2050,10,10)})
                localStorage.clear();
                toast.error('Problem z uwierzytelnianiem. Zaloguj si?? ponownie', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => window.location.reload(), 3000);
            }
        });
    }

    const getUserData = () => {
        axios.get(`${API_URL}users/getInfo`, {
            headers: {Authorization: 'Bearer ' + token},
        }).then((response) => {
            const userData = {
                id: response.data.info.id,
                email: response.data.info.login,
                name: response.data.info.full_name,
                notifications: response.data.info.notifications_area,
                lastLoginDate: response.data.info.last_login_date,
                lastPasswordChange: response.data.info.last_password_change,
                token,
            };
            User.saveData(JSON.stringify(userData));
            user.login(userData);
            history.push(history.location.state || TourismRoutes.UserProfile);
        });
    }


    const onEnterPress = e => {
        const enterButton = e.keyCode || e.which;
        if (enterButton === 13) {
            loginUser()
        }
    }

    return (

        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../../img/LoginRegistration/photo.png')}/>
            </div>
            <div className="container__form">
                {!!errors.length && (
                    <div className='container__form-notice'>
                        {errors.map((error, index) => (
                            <React.Fragment key={index}>
                                {error}<br/>
                            </React.Fragment>
                        ))}
                    </div>
                )}
                <p>
                    Zaloguj Si??
                </p>

                <InputComponent
                    fieldName={'EMAIL'}
                    name={'login'}
                    value={state.login}
                    onChange={handleChange}
                    onKeyPress={e => onEnterPress(e)}
                    containerStyles={{borderColor: emptyLogin ? 'red' : '#d2d2d2'}}
                />
                <InputComponent
                    fieldName={'HAS??O'}
                    name={'password'}
                    value={state.password}
                    imageSrcForSwitch={require('../../../svg/icons/passwordVisible.svg')}
                    containerStyles={{margin: '5px 5px 50px 5px', borderColor: emptyPassword ? 'red' : '#d2d2d2'}}
                    password={true}
                    onChange={handleChange}
                    onKeyPress={e => onEnterPress(e)}
                />

                <ButtonWithLoader
                    onClick={loginUser}
                    buttonText={'Zaloguj Si??'}
                    isLoading={loading}
                />

                <ToastContainer/>


                <div className="bottom-container" style={{margin: '5px 5px -10px 5px'}}>
                    <div className="login-container">
                        <div>Nie masz konta?</div>
                        <button onClick={() => history.push('/registration')}> Zarejestruj si??</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;