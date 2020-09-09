import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/events/loop-event-post.scss";

import EventDates from "./EventDates";

const fromTimeStampToDateObj = timestamp => ( new Date( timestamp * 1000 ));

export default function LoopEventsPost (props) {
	const {id, image, title, categories_labels, event_start_date, event_end_date} = props;

	const event_dates = {
		start_date: event_start_date ? fromTimeStampToDateObj( event_start_date ) : null,
		end_date: event_end_date ? fromTimeStampToDateObj( event_end_date ) : null,
	};

	return (
		<Link to={`/events/${id}`} className="loop-event-post">
			<div className="loop-event-post__thumbnail has-overlay thumbnail" style={{ backgroundImage: `url("${image}")` }}>
				{categories_labels && (
					<div className="loop-event-post__category">  
						{categories_labels}
					</div>
				)}
			</div>

			<div className="loop-event-post__content">
				<EventDates {...event_dates } />
				<div className="loop-event-post__title heading">{title}</div>
			</div>
		</Link>
	);
}
