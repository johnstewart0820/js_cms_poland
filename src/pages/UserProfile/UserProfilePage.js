import React from 'react';
import '../../styles/StadiumReservationPages/StadiumReservation.scss';
import {Row} from "react-bootstrap";
import '../../styles/UserProfilePage/UserProfile.scss';
import axios from '../../extra/axios';
import {ChangePassword} from "../../components/UserProfile/ChangePaswword";
import {UserProfileData} from "../../components/UserProfile/UserProfileData";
import Loader from "../../components/general/Loader";
import {Container} from "../../components/userPanel/Container";

const UserProfilePage = () => {
    const [loading, setLoading] = React.useState(true);
    const [notifications_area, setNotificationsArea] = React.useState([]);
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
                    name: response.data.info.full_name,
                });
                setNotificationsArea(response.data.info.notifications_area);
                setLoading(false);
            }).catch(error => {
                alert(error.response.data.errors);
        });
    }

    React.useEffect(() => {
        getUserData()
    },[]);

    if (loading)
        return <Container containerTitle={'MOJ PROFIL'}>
                    <div>
                        <Loader/>
                    </div>
                </Container>
    return(
         <Container
            containerTitle={'MOJ PROFIL'}
         >
             <Row>
                 {!loading && (
                     <>
                         <UserProfileData
                             login={state.login}
                             name={state.name}
                             email={state.email}
                             notifications={notifications_area}
                         />
                         <ChangePassword/>
                     </>
                 )}
             </Row>
         </Container>
    )
}

export default UserProfilePage;