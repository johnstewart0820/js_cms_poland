import React from "react";
import '../../styles/UserPanel/UserPanel.scss';
import {PanelButton} from "./PanelButton";
import {UserPanelHeader} from "./UserPanelHeader";
import {useHistory} from "react-router-dom";
import * as axios from "axios";

export const UserPanel = () => {
    const history = useHistory();

    const logout = () => {
        axios.get(
            `https://api.ustron.s3.netcore.pl/users/logout`,
        )
        .then(() => {
            alert('Goodbye');
            history.push('/login');
        }, (error) => {
            alert(error);
        });
    }

    return (
        <div className="panel-container">
            <UserPanelHeader/>
            <div className="panel-container__body">
                <PanelButton
                    onClick={() => history.push('/profile')}
                    lines={true}
                    buttonImage={require('../../svg/icons/id-card.svg')}
                    buttonText={'Moj profil'}
                />
                <PanelButton
                    onClick={() => history.push('/stadium-reservation')}
                    lines={true}
                    buttonImage={require('../../svg/icons/stadium-black.svg')}
                    buttonText={'Rezerwacja boisk'}
                />
                <PanelButton
                    lines={true}
                    buttonImage={require('../../svg/icons/pencil-black.svg')}
                    buttonText={'Rejestracja na zawody'}
                />
                <PanelButton
                    lines={true}
                    buttonImage={require('../../svg/icons/marker.svg')}
                    buttonText={'Moje obiekty'}
                />
                <PanelButton
                    lines={true}
                    buttonImage={require('../../svg/icons/circle.svg')}
                    buttonText={'E-CZK'}
                    lastChild={true}
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