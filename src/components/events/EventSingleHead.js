import React from 'react';
import EventDates from './EventDates';
import PageHeaderSection from "../header/PageHeaderSection";

const EventSingleHead = ({title, categories_labels, thumbnail, custom_data}) => (

    <PageHeaderSection extra_classes="single-event" thumbnail={thumbnail}>
        <div className="category"> {categories_labels} </div>
        <div className="page-title"> {title} </div>
        {!custom_data.event.nearest_date && <p>wydarzenie odbyło się</p>}
        <EventDates
            end_date={new Date((custom_data.event.nearest_date ?
                custom_data.event.nearest_date.end_date : custom_data.event.latest_date.end_date) * 1000)}
            start_date={new Date((custom_data.event.nearest_date ?
                custom_data.event.nearest_date.start_date : custom_data.event.latest_date.start_date) * 1000)}
        />
        {custom_data.event.organizer_name &&
        <>
            <p>organizator:</p>
            <div>{custom_data.event.organizer_name}</div>
            <div>{custom_data.event.organizer_address}</div>
            {custom_data.event.organizer_url &&
            <div className={'www-container'}>
                <img alt='' src={require('../../svg/icons/www_white.svg')}/>
                <a
                    href={custom_data.event.organizer_url}
                    className={'www'}>{custom_data.event.organizer_url}
                </a>
            </div>
            }
        </>}
    </PageHeaderSection>
)

EventSingleHead.propTypes = {}

export default EventSingleHead;