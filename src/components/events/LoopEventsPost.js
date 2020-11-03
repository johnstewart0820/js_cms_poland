import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/events/loop-event-post.scss";

import EventDates from "./EventDates";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";

const fromTimeStampToDateObj = timestamp => ( new Date( timestamp * 1000 ));

export default function LoopEventsPost (props) {

	const { image, title, categories_labels, event_start_date, event_end_date } = props;
	const is_one_day = props?.custom_data?.event?.is_one_day === "1";

	const event_dates = {
		start_date: event_start_date ? fromTimeStampToDateObj( event_start_date ) : null,
		end_date: event_end_date ? fromTimeStampToDateObj( event_end_date ) : null,
		is_one_day
	};

	return (
		<Link to={getArticleLink(props)} className="loop-event-post">
			<div className="loop-event-post__thumbnail has-overlay thumbnail" style={{ backgroundImage: `url("${image || DefaultImage}")` }}>
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
