import React from 'react';
import '../../styles/UserPanel/PanelButton.scss';
import {NavLink} from "react-router-dom";

export const PanelLink = props => (
    <>
        {props.lines && <hr/>}
        <NavLink
            to={props.to ? props.to : ''}
            activeClassName={props.activeClassName || 'focus'}
            onClick={props.onClick}
            className={`panel-container__button ${props.extraClasses}`}>
            <img alt='' src={props.buttonImage} />
            {props.buttonText}
        </NavLink>
        {props.lastChild && props.lines && <hr/>}
    </>
)