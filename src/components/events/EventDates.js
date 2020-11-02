import React from 'react';
import PropTypes from "prop-types";

import { getAllFromDateObject } from "../../extra/date";
import "../../styles/events/event-dates.scss";

const DayNumMonth = ({ day_num, month_name }) => (
	<>
		<strong> { day_num } </strong> 
		<span> { month_name } </span>
	</>
)

export default function EventDates({start_date, end_date, is_one_day}) {

    const start_date_obj = getAllFromDateObject(start_date);
    const end_date_obj = getAllFromDateObject(end_date)

    function isNotFieldEmpty(date) {
        if (date.year.toString() === '1970') return false;
        else return date;
    }

    return (
        <div className="event-dates">
            {start_date_obj && end_date_obj &&
            <div className={`event-dates__several_dates ${parseInt(is_one_day) === 0 && 'vertical-line'}`}>
                {isNotFieldEmpty(start_date_obj) &&
                <div className={`event-dates__date ${parseInt(is_one_day) === 0 && 'vertical-line'}`}>
                    <DayNumMonth {...start_date_obj} /></div>}
                {(isNotFieldEmpty(end_date_obj) && parseInt(is_one_day) === 0 )&&
                <div className={`event-dates__date ${parseInt(is_one_day) === 0 && 'vertical-line'}`}>
                    <DayNumMonth {...end_date_obj} /></div>}
            </div>
            }

			{ start_date_obj && !end_date_obj && 
				<div className="event-dates__date"> <DayNumMonth {...start_date_obj } />  </div>
			}

            <div className="event-dates__time">
                {start_date_obj && end_date_obj &&
                <>
                    {isNotFieldEmpty(start_date_obj) && parseInt(is_one_day) === 0 &&<div> {start_date_obj.time} </div>}
                    {isNotFieldEmpty(end_date_obj) && parseInt(is_one_day) === 0 && <div> {end_date_obj.time} </div>}
                </>
                }

                {start_date_obj && !end_date_obj && <> {start_date_obj.time} </>}
            </div>
        </div>
    )
}


EventDates.propTypes = {
    start_date: PropTypes.instanceOf(Date),
    end_date: PropTypes.instanceOf(Date),
}