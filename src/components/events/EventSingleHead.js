import React from 'react';
import EventDates from './EventDates';
import PageHeaderSection from "../header/PageHeaderSection";

const EventSingleHead = ({title, categories_labels, thumbnail, custom_data }) => {

    const {
        nearest_date,
        latest_date,
        organizer_name,
        organizer_address,
        organizer_url,
    } = custom_data.event;

    const convertDayMonth = (dateToConvert) => {
        const day = dateToConvert.substr(0, 2);
        const month = dateToConvert.substr(3, 2);
        const restOfDate = dateToConvert.substr(6);

        return `${month}.${day}.${restOfDate}`;
    }
    return (
        <PageHeaderSection extra_classes="single-event" thumbnail={thumbnail}>
            <div className="category"> {categories_labels} </div>
            <div className="page-title"> {title} </div>
            {!nearest_date && <p>wydarzenie odbyło się</p>}
            {(nearest_date || latest_date) &&
            <EventDates
                is_one_day = { custom_data.event.is_one_day }
                end_date={new Date(nearest_date ?
                    convertDayMonth(nearest_date.end_date) : convertDayMonth(latest_date.end_date))}
                start_date={new Date(nearest_date ?
                    convertDayMonth(nearest_date.start_date) : convertDayMonth(latest_date.start_date))}
            />}
            {organizer_name.charAt(0) !== "-" &&
            <>
                <p>organizator:</p>
                <div>{organizer_name}</div>
                <div>{organizer_address}</div>
                {organizer_url &&
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
}

export default EventSingleHead;