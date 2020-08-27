import React from "react";
import '../../styles/UserPanel/PanelButton.scss';

const PanelButton = props => (
    <>
        {props.lines && <hr/>}
        <button
            onClick={props.onClick}
            className={`panel-container__button ${props.extraClasses}`}>
            <img alt='' src={props.buttonImage} />
            {props.buttonText}
        </button>
        {props.lastChild && props.lines && <hr/>}
    </>
)

export default PanelButton;