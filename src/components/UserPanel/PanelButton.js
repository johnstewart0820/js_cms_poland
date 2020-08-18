import React from 'react';
import '../../styles/UserPanel/PanelButton.scss';

export const PanelButton = props => (
    <React.Fragment>
        {props.lines && <hr/>}
        <button
            onClick={props.onClick}
            className={"panel-container__button"}>
            <img alt='' src={props.buttonImage} />
            {props.buttonText}
        </button>
        {props.lastChild && props.lines && <hr/>}
    </React.Fragment>
)