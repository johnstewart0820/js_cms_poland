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
            <div className="day__month"> { monthName } </div>
            <div className="day__num"> { number } </div>
            
				<hr/>

            <div className="day__name">{dayName}</div>
        </button>
    )
}

export default DayButton;
