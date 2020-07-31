import React from 'react';

export const CircleButton = props => (
    <button
        onClick={props.onClick}
        className="circle-button">
        <img alt="" src={props.circleButtonSrc}/>
    </button>
)
