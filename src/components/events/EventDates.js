import React from 'react';
import PropTypes from "prop-types";

import {getAllFromDateObject} from "../../extra/date";
import "../../styles/events/event-dates.scss";

const DayNumMonth = ({day_num, month_name}) => (
    <>
        <strong> {day_num} </strong>
        <span> {month_name} </span>
    </>
)

export default function EventDates({start_date, end_date, is_one_day}) {

    const start_date_obj = getAllFromDateObject(start_date);
    const end_date_obj = getAllFromDateObject(end_date);

    const isTheSameDay = () => {
        if (start_date_obj.day_num === end_date_obj.day_num && start_date_obj.month_num === end_date_obj.month_num)
            return true;
        return false;
    }

    const isNotFieldEmpty = date => {
        if (date.year.toString() === "1970") return false;
        else return true;
    }

    return (
        <div className="event-dates">
            {start_date_obj && end_date_obj && !is_one_day &&
            <div className={`event-dates__several_dates ${isTheSameDay() && 'centralDate'}`}>

                {isNotFieldEmpty(start_date_obj) &&
                <div className={`event-dates__date`}>
                    <DayNumMonth {...start_date_obj} />
                </div>
                }

                {isNotFieldEmpty(end_date_obj) && !isTheSameDay() &&
                <div className={`event-dates__date`}>
                    <DayNumMonth {...end_date_obj} />
                </div>
                }
            </div>
            }

            {start_date_obj && is_one_day &&
            <div className="event-dates__date" style={{border: 0}}><DayNumMonth {...start_date_obj} /></div>
            }

            {start_date_obj && end_date_obj && !is_one_day &&
            <div className="event-dates__time">
                {isNotFieldEmpty(start_date_obj) && !is_one_day && <div> {start_date_obj.time} </div>}
                {isNotFieldEmpty(end_date_obj) && !is_one_day && <div> {end_date_obj.time} </div>}
            </div>
            }

            {start_date_obj && !end_date_obj && !is_one_day &&
            <div className="event-dates__time"> {start_date_obj.time} </div>
            }
        </div>
    )
}


EventDates.propTypes = {
    start_date: PropTypes.instanceOf(Date),
    end_date: PropTypes.instanceOf(Date),
}