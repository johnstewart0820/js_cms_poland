import React from 'react';
import '../../styles/LoginRegistrationPages/RegistrationPage.scss';
import * as axios from "axios";
import {useHistory} from 'react-router-dom';

const ActivateAccountPage = () => {
    const [error, setError] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hash = params.get('hash');

        if (hash) {
            axios.post('https://api.ustron.s3.netcore.pl/users/activate', {
                hash: hash
            }).then(() => {
                history.push('/login');
            }).catch(() => {
                setError('Error account activation');
            })
        }
    },[history]);

    return(
        <div className="registration-container" style={{padding: 0}}>
            <div className="container__photo">
                <img alt='' src={require('../../img/LoginRegistration/photo.png')} />
            </div>
            <div className="container__form">
                <p>
                    {!error ? 'Activating your account . . .' : error}
                </p>
            </div>
        </div>
    )
}

export default ActivateAccountPage;