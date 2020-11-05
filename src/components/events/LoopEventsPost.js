import React from 'react';
import {Link} from "react-router-dom";

import "../../styles/events/loop-event-post.scss";

import EventDates from "./EventDates";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";

const fromTimeStampToDateObj = timestamp => (new Date(timestamp * 1000));

export default function LoopEventsPost(props) {
    const {image, title, categories_labels, event_start_date, event_end_date} = props;

    const event_dates = {
        start_date: event_start_date ? fromTimeStampToDateObj(event_start_date) : null,
        end_date: event_end_date ? fromTimeStampToDateObj(event_end_date) : null,
    };

    const convertDayMonth = (dateToConvert) => {
        const day = dateToConvert.substr(0, 2);
        const month = dateToConvert.substr(3, 2);
        const restOfDate = dateToConvert.substr(6);
        return `${month}.${day}.${restOfDate}`;
    }

    return (
        <Link to={getArticleLink(props)} className="loop-event-post">
            <div className="loop-event-post__thumbnail has-overlay thumbnail"
                 style={{backgroundImage: `url("${image || DefaultImage}")`}}>
                {categories_labels && (
                    <div className="loop-event-post__category">
                        {categories_labels}
                    </div>
                )}
            </div>

            <div className="loop-event-post__content">
                <EventDates
                    is_one_day={props.custom_data.event.is_one_day}
                    end_date={new Date(props.custom_data.event.nearest_date ?
                        convertDayMonth(props.custom_data.event.nearest_date.end_date) : convertDayMonth(props.custom_data.event.latest_date.end_date))}
                    start_date={new Date(props.custom_data.event.nearest_date ?
                        convertDayMonth(props.custom_data.event.nearest_date.start_date) : convertDayMonth(props.custom_data.event.latest_date.start_date))}
                />
                <div className="loop-event-post__title heading">{title}</div>
            </div>
        </Link>
    );
}
