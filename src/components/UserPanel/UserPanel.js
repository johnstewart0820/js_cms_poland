import React, { useState, useContext } from "react";
import '../../styles/UserPanel/UserPanel.scss';
import {PanelLink} from "./PanelLink";
import {useHistory} from "react-router-dom";
import axios from '../../extra/axios';
import TourismRoutes from "../../constants/TourismRoutes";
import UserContext from "../../constants/UserContext";
import PanelButton from "./PanelButton";

import Angle from "../../svg/components/Angle";
import LocalStorage from "../../constants/LocalStorage";


export const UserPanel = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
	 const [role, setRole] = useState('');
	 
	 const [ mobile_visible, setMobileVisible ] = useState( false );


    React.useEffect(() => {
        setName(userContext.name);
    }, []);

    const logout = () => {
        axios.get(`https://api.ustron.s3.netcore.pl/users/logout`)
        .then(() => {
            window.localStorage.clear();
            history.push('/login');
            userContext.logout();
        }, (error) => {
            alert(error);
        });
	 }
	 

	 const panel_links = [
		 { 
			 to: TourismRoutes.UserProfile,
			 buttonImage: require('../../svg/icons/id-card.svg'),
			 buttonText: 'Moj profil'
		 },
		 {
			 to: TourismRoutes.ReservationHistoryPage,
			 buttonImage: require('../../svg/icons/stadium-black.svg'),
			 buttonText: 'Rezerwacja boisk',
		 },
		 {
			to: TourismRoutes.RegisterToEventList, 
			buttonImage: require('../../svg/icons/pencil-black.svg'),
			buttonText: 'Rejestracja na zawody'
		},
		{
			to: TourismRoutes.ObjectListPage,
			buttonImage: require('../../svg/icons/marker.svg'),
			buttonText: 'Moje obiekty'
		},
		// {
		// 	to: "/",
		// 	buttonImage: require('../../svg/icons/circle.svg'),
		// 	buttonText: 'E-CZK',
		// },
		{
			to: TourismRoutes.GameCardsPage,
			buttonImage: require('../../svg/icons/joystick.svg'),
			buttonText: 'Gra'
		},
	 ]


	 const panel_buttons = [
		 {
			 onClick: logout,
			 buttonText: 'Wyloguj się',
			 buttonImage: require('../../svg/icons/lock.svg')
		 },
		 {
			buttonText: '',
			buttonImage: require('../../svg/icons/gear.svg')
		}
	 ]

    return (
        <div className={`panel-container ${ mobile_visible ? "visible" : "" }`}>

				<div className="panel-container__mobile_toggle" onClick={ () => setMobileVisible( !mobile_visible ) }> 
					<Angle direction={ mobile_visible ? "left" : "right" } />
				</div>

            <div className="panel-container__header">
                <img alt='user photo' src={ require('../../svg/icons/user-photo.svg') }/>
                <div className="column">
                    <h3> { JSON.parse(localStorage.getItem(LocalStorage.UserToken)).name } </h3>
                    {/* <p>{role}</p> */}
                </div>
            </div>

            <div className="panel-container__body">	
					{ panel_links.map(( item, index ) => (
						<PanelLink 
							key={ index } 
							{...item } 	
						/>
					)) }
            </div>

            <div className="panel-container__footer">
					{ panel_buttons.map(( item, index ) => (
						<PanelButton
							key={ index }
							{...item}
                	/>
					)) }
            </div>
        </div>
    )
}