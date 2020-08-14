import React from 'react';
import {UserPanel} from "./UserPanel";
import '../../styles/UserPanel/Container.scss'
import {useLocation, useHistory} from "react-router-dom";
import TourismRoutes from "../../constants/TourismRoutes";
import Notification from "../notification/Notification";

export const Container = props => {
    const location = useLocation();
    const history = useHistory();
    return(
        <div className="custom-container">
            <UserPanel/>
            <div className="container-fluid">
                {props.setNotification && <Notification message={props.notificationMessage}/>}
                <div className="row">
                    <div className="page-title">
                        <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                        <h3>
                            {props.containerTitle}
                        </h3>
                    </div>
                    {location.pathname === '/reservation-history' && (
                        <div className="button-container">
                            <button
                                className="button-link green full-width"
                                onClick={() => history.push(TourismRoutes.StadiumReservation)}
                            >ZAREZERWUJ BOISKO</button>
                        </div>
                    )}
                </div>
                {props.children}
            </div>
        </div>
    )
}