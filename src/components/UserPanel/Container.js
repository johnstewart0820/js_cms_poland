import React from 'react';
import {UserPanel} from "./UserPanel";
import '../../styles/UserPanel/Container.scss'
import {useHistory} from "react-router-dom";
import Notification from "../notification/Notification";

export const Container = props => {
    const history = useHistory();
    const locations = {
      reservation: '/reservation-history',
      registerToEvent: '/register-event'
    };

    return(
        <div className="custom-container">
            <UserPanel/>
            <div className="container-fluid">
                {props.setNotification && <Notification message={props.notificationMessage}/>}
                <div className='row' style={!!locations.reservation && !!locations.registerToEvent ? {justifyContent: 'space-between'} : {justifyContent: ''}}>
                    <div className="page-title">
                        <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                        <h3>
                            {props.containerTitle}
                        </h3>
                    </div>
                    {props.addContainerButton && (
                        <div className="button-container">
                            <button
                                className="button-link green full-width"
                                onClick={() => history.push(props.routeForContainerButton)}
                            >{props.textForContainerButton}</button>
                        </div>
                    )}
                </div>
                {props.children}
            </div>
        </div>
    )
}