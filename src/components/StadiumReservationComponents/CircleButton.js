import React from 'react';
import '../../styles/StadiumReservationPages/CircleButton.scss';

export const CircleButton = props => (
    <button
        onClick={props.onClick}
        className="circle-button">
        <img alt="" src={props.circleButtonSrc}/>
    </button>
)
