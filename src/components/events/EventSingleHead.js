import React from 'react';

import EventDates from './EventDates';
import PageHeaderSection from "../header/PageHeaderSection";

const EventSingleHead = ({ title, category, thumbnail, dates }) => (
	<PageHeaderSection extra_classes="single-event" thumbnail={ thumbnail } > 
			
			<div className="category"> { category } </div>
			<div className="page-title"> { title } </div>
			<EventDates { ...dates } />

	</PageHeaderSection>
)

EventSingleHead.propTypes = { }

export default EventSingleHead;