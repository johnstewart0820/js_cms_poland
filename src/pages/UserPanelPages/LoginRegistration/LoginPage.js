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

const LoginPage = () => {
    const history = useHistory();
    const planerContext = React.useContext(PlanerContext);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({
        login: '',
        password: '',
    });
    const user = React.useContext(UserContext);
    let token = '';

    React.useEffect(() => {
        planerContext.setVisible(false);
    },[]);

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    const loginUser = () => {
        let userData = state;
        axios.post(
            `${API_URL}users/login`, userData
        ).then((response) => {
            token = response.data.token;
            setLoading(true);
        }).then(getUserData).catch(error => {
            const responseErrors = error.response?.data?.errors;
            if (responseErrors)
                setErrors(Array.isArray(responseErrors) ? responseErrors : [responseErrors]);
            else
                setErrors(['Error sending login request']);
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
            history.push('/profile');
        });
    }

    const onEnterPress = e => {
        const enterButton = e.keyCode || e.which;
        if (enterButton === 13) {
            loginUser()
        }
    }

    return(
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../../img/LoginRegistration/photo.png')} />
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
                    Zaloguj Się
                </p>
                <InputComponent
                    fieldName={'EMAIL'}
                    name={'login'}
                    value={state.login}
                    onChange={handleChange}
                    onKeyPress={e => onEnterPress(e)}
                />
                <InputComponent
                    fieldName={'HASŁO'}
                    name={'password'}
                    value={state.password}
                    imageSrcForSwitch={require('../../../svg/icons/passwordVisible.svg')}
                    containerStyles={{margin: '5px 5px 50px 5px'}}
                    password={true}
                    onChange={handleChange}
                    onKeyPress={e => onEnterPress(e)}
                />

                <ButtonWithLoader
                    onClick={loginUser}
                    buttonText={'Zaloguj Się'}
                    isLoading={loading}
                />

                <div className="bottom-container" style={{margin: '5px 5px -10px 5px'}}>
                    <div className="login-container">
                        <h5>Nie masz konta ? </h5><button onClick={() => history.push('/registration')}>  Zarejestruj się </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;