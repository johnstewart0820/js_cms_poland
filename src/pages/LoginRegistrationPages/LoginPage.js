import React from 'react';
import '../../styles/LoginRegistrationPages/RegistrationPage.scss';
import InputComponent from "../../components/form/InputComponent";
import * as axios from "axios";
import {useHistory} from 'react-router-dom';
import {UserPanel} from "../../components/userPanel/UserPanel";

const LoginPage = () => {
    const history = useHistory();
    const [visible, setVisible] = React.useState(false);
    const [state, setState] = React.useState({
        login: '',
        password: '',
    });

    const visibilitySwitch = () => {
        if (visible === false) {
            setVisible(true);
            console.log(visible)
        } else {
            setVisible(false);
            console.log(visible)
        }
    }

    const handleChange = e => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }

    const activation = () => {
       const params = new URLSearchParams(window.location.search);
       const hash = params.get('hash');
       console.log(hash);
    }

    React.useEffect(() => {
        activation();
    });

    const login = () => {
        let data = state;
        axios.post(
            `https://api.ustron.s3.netcore.pl/users/login`, data
        )
        .then((response) => {
            console.log(response);
            if (response.status === 200)
                history.push('/reservation');
        }, (error) => {
            alert(error.response.data.errors);
        });
    }

    return(
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../img/LoginRegistration/photo.png')} />
            </div>
            <div className="container__form">
                <p>
                    Zaloguj Się
                </p>
                <InputComponent
                    fieldName={'EMAIL'}
                    name={'login'}
                    value={state.login}
                    inputHandler={handleChange}
                />
                <InputComponent
                    fieldName={'HASŁO'}
                    name={'password'}
                    value={state.password}
                    imageSrcForSwitch={require('../../svg/icons/passwordVisible.svg')}
                    containerStyles={{margin: '5px 5px 50px 5px'}}
                    inputImage={true}
                    type={visible === true ? 'text' : 'password'}
                    switchHandler={visibilitySwitch}
                    inputHandler={handleChange}
                />

                <button
                    className="button-link green full-width"
                    onClick={login}
                >
                    Zaloguj Się
                </button>

                <div className="bottom-container" style={{margin: '5px 5px -10px 5px'}}>
                    <div className="login-container">
                        <h5>Nie masz konta ? </h5><a onClick={() => history.push('/registration')}>  Zarejestruj się </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;