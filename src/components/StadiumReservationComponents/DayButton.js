import React from "react";
import '../../styles/StadiumReservationPages/DayButton.scss';

const dayButton = ({containerStyles, monthName, dayName, date, onClick}) => {
    return (
        <button
            className="day"
            onClick={onClick}
            style={containerStyles}>
            <h3>{monthName}</h3>
            <h1>{date}</h1>
            <hr/>
            <h4>{dayName}</h4>
        </button>
    )
}

export default dayButton;