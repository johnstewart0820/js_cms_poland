import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/events/loop-event-post.scss";

import EventDates from "./EventDates";


const LoopEventsPost = ({ id, thumbnail, title, category, start_date, end_date, start_time, end_time }) => (
	<Link to={`/events/${ id }`} className="loop-event-post">
		<div className="loop-event-post__thumbnail has-overlay thumbnail" style={{ backgroundImage: `url(${ thumbnail })` }}>
			<div className="loop-event-post__category"> { category } </div>
		</div>

		<div className="loop-event-post__content">

			<EventDates {...{ start_date, end_date, start_time, end_time }} />
			<div className="loop-event-post__title heading"> { title } </div>
		</div>
	</Link>
)

LoopEventsPost.propTypes = { }

export default LoopEventsPost;