import React from 'react';

import EventDates from './EventDates';
import PageHeaderSection from "../header/PageHeaderSection";

const EventSingleHead = ({ title, categories_labels, thumbnail, event_end_date,event_start_date }) => (



	<PageHeaderSection extra_classes="single-event" thumbnail={ thumbnail } >

        <div className="category"> { categories_labels } </div>
			<div className="page-title"> { title } </div>
			<EventDates
                end_date={new Date(event_end_date*1000)}
                start_date={new Date(event_start_date*1000)}
            />
	</PageHeaderSection>
)

EventSingleHead.propTypes = { }

export default EventSingleHead;