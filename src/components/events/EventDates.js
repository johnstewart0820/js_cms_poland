import React from 'react';

import { getDateObjectFromDDMMYYYY, getAllFromDateObject } from "../../extra/date";
import "../../styles/events/event-dates.scss";

const ProperDateFormat = ({ date_dd_mm_yyyy }) => {

	const date_obj = getDateObjectFromDDMMYYYY( date_dd_mm_yyyy );
	const { month_name, day_num } = getAllFromDateObject( date_obj );
	return (
		<>
			<strong> { day_num } </strong> 
			<span> { month_name } </span>
		</>
	)
}


const EventDates = ({ start_date, start_time, end_date, end_time }) => (

	<div className="event-dates">
		{ start_date && end_date && 
			<div className="event-dates__several_dates"> 
				<div className="event-dates__date"> <ProperDateFormat date_dd_mm_yyyy={ start_date }/> </div>
				<div className="event-dates__date"> <ProperDateFormat date_dd_mm_yyyy={ end_date }/>  </div>
			</div>
		} 

		{ start_date && !end_date && 
			<div className="event-dates__date"> <ProperDateFormat date_dd_mm_yyyy={ start_date }/>  </div>
		}

		<div className="event-dates__time">
			{ start_date && end_date &&
				<>
					<div> { start_time } </div>
					<div> { end_time } </div>
				</>
			}  
			
			{ start_date && !end_date && <> { start_time } </> }
		</div>
	</div>
)

EventDates.propTypes = { }

export default EventDates;