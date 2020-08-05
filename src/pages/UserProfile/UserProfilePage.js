import React from 'react';
import {UserPanel} from "../../components/userPanel/UserPanel";
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import {Row} from "react-bootstrap";
import '../../styles/UserProfilePage/UserProfile.scss';
import axios from '../../extra/axios';
import {UserCategory} from "../../components/UserProfile/UserCategory";
import {UserProfileData} from "../../components/UserProfile/UserProfileData";
import Loader from "../../components/general/Loader";

const UserProfilePage = () => {
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        login: '',
        name: '',
        email: ''
    });

    const getUserData = () => {
        axios.get('https://api.ustron.s3.netcore.pl/users/getInfo')
            .then((response) => {
                setState({
                    ...state,
                    login: response.data.info.login,
                    email: response.data.info.login,
                    name: response.data.info.full_name
                });
                setLoading(false);
            }).catch(error => {
            alert(error.response.data.errors);
        });
    }

    React.useEffect(() => {
        getUserData()
    },[]);

    return(
        <div className="custom-container">
            <UserPanel/>
            {loading && (
                <Loader/>
            )}
            <div className="container-fluid">
                <Row>
                   <div className="title">
                       <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                       <h3>
                           MOJ PROFIL
                       </h3>
                   </div>
                </Row>
                <Row>
                    {!loading && (
                        <>
                            <UserCategory
                                userName={state.name}
                            />
                            <UserProfileData
                                login={state.login}
                                name={state.name}
                                email={state.email}
                            />
                        </>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default UserProfilePage;