import React from "react";
import '../../styles/StadiumReservationPages/DayButton.scss';

const DayButton = ({disabled, active, containerStyles, monthName, dayName, date, onClick}) => {
    const classes = disabled ? ' disabled' : active ? ' active' : '';
    return (
        <button
            className={'day' + classes}
            onClick={onClick}
            style={containerStyles}
        >
            <h3>{monthName}</h3>
            <h1>{date}</h1>
            <hr/>
            <h4>{dayName}</h4>
        </button>
    )
}

export default DayButton;
