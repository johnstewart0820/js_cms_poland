import React from "react";
import '../../styles/UserPanel/UserPanel.scss';
import {PanelLink} from "./PanelLink";
import {useHistory} from "react-router-dom";
import axios from '../../extra/axios';
import TourismRoutes from "../../constants/TourismRoutes";
import UserContext from "../../constants/UserContext";
import PanelButton from "./PanelButton";

export const UserPanel = () => {
    const history = useHistory();
    const userContext = React.useContext(UserContext);
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState('');

    React.useEffect(() => {
        setName(userContext.name);
    }, [userContext]);

    const logout = () => {
        axios.get(
            `https://api.ustron.s3.netcore.pl/users/logout`,
        )
        .then(() => {
            window.localStorage.clear();
            history.push('/login');
            userContext.logout();
        }, (error) => {
            alert(error);
        });
    }

    return (
        <div className="panel-container">
            <div className="panel-container__header">
                <img alt='' src={require('../../svg/icons/user-photo.svg')}/>
                <div className="column">
                    <h3>{name}</h3>
                    {/*<p>{role}</p>*/}
                </div>
            </div>
            <div className="panel-container__body">
                <PanelLink
                    to={TourismRoutes.UserProfile}
                    lines={true}
                    buttonImage={require('../../svg/icons/id-card.svg')}
                    buttonText={'Moj profil'}
                />
                <PanelLink
                    to={TourismRoutes.ReservationHistoryPage}
                    lines={true}
                    buttonImage={require('../../svg/icons/stadium-black.svg')}
                    buttonText={'Rezerwacja boisk'}
                />
                <PanelLink
                    to={TourismRoutes.RegisterToEventList}
                    lines={true}
                    buttonImage={require('../../svg/icons/pencil-black.svg')}
                    buttonText={'Rejestracja na zawody'}
                />
                <PanelLink
                    to={TourismRoutes.ObjectListPage}
                    lines={true}
                    buttonImage={require('../../svg/icons/marker.svg')}
                    buttonText={'Moje obiekty'}
                />
                {/*<PanelLink*/}
                {/*    to={'/'}*/}
                {/*    lines={true}*/}
                {/*    buttonImage={require('../../svg/icons/circle.svg')}*/}
                {/*    buttonText={'E-CZK'}*/}
                {/*/>*/}
                <PanelLink
                    buttonText={'Gra'}
                    buttonImage={require('../../svg/icons/joystick.svg')}
                    lines={true}
                    lastChild={true}
                    to={TourismRoutes.GameCardsPage}
                />
            </div>
            <div className="panel-container__footer">
                <PanelButton
                    onClick={logout}
                    buttonText={'Wyloguj się'}
                    buttonImage={require('../../svg/icons/lock.svg')}
                />
                <PanelButton
                    buttonImage={require('../../svg/icons/gear.svg')}
                />
            </div>
        </div>
    )
}