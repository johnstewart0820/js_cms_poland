import React from 'react';
import '../../styles/UserPanel/PanelButton.scss';
import {NavLink} from "react-router-dom";

export const PanelLink = props => (
    <>
        <NavLink
            to={ props.to ? props.to : ''}
            onClick={ props.onClick }
            className={`panel-container__button ${ props.extraClasses || "" }`}>
            <img alt='btn img' src={ props.buttonImage } />
            
				<span> { props.buttonText } </span>
        </NavLink>
    </>
)