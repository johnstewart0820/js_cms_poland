import React from "react";
import '../../styles/StadiumReservationPages/DayButton.scss';

const DayButton = ({disabled, containerStyles, date, monthName, dayName, number, onClick, shared}) => {
    const active = !!shared?.selectedDate?.isSame(date);
    const classes = disabled ? ' disabled' : active ? ' active' : '';
    return (
        <button
            className={'day' + classes}
            onClick={onClick}
            style={containerStyles}
        >
            <h3>{monthName}</h3>
            <h1>{number}</h1>
            <hr/>
            <h4>{dayName}</h4>
        </button>
    )
}

export default DayButton;
