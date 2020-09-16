import React from "react";
import usePrevious from "../hooks/usePrevious";
import moment from "moment";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PicturesSlider from "../components/slider/PicturesSlider";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import {DayCarousel} from "../components/events/DayCarousel";
import Carousel from "../components/carousel/Carousel";
import {PageDescription} from "../components/events/PageDescription";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import LoopEventsPost from "../components/events/LoopEventsPost";

import '../styles/EventsPage/EventsPage.scss';
import '../styles/Calendar/Calendar.scss';
import {API} from "../extra/API";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";

const EventsPage = props => {
    const acf = props.page.acf;
    const [events, setEvents] = React.useState([]);
    const [slides, setSlides] = React.useState(null);

    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [selectedDay, setSelectedDay] = React.useState(null);
    const prevCalendarDate = usePrevious(calendarDate);
    const [monthDays, setMonthDays] = React.useState([]);


    const pageDescription = {
        buttonText: acf.field_new_event_button_title,
        title: acf.field_new_event_title,
        description: acf.field_new_event_description,
    };

    const infoModule = {
        events: acf.field_nearest_events_information_module[0].field_section_categories_visit,
        title: acf.field_nearest_events_information_module[0].field_section_title_visit,
    };


    React.useEffect(() => {
    },[]);

    React.useEffect(() => {
        API.getEntities({
            categories: acf.field_nearest_events_information_module[0].field_section_categories_visit,
        }).then(res => setSlides(res.data.contents));
    },[]);

    React.useEffect(() => {
        let daysInMonth = moment().daysInMonth();
        const currentDay = moment().day();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            let current = moment().day(i);

            days.push({
                key: current.format('DD.MM.YYYY'),
                active: (i === currentDay),
                onClick: () => setCalendarDate(current.toDate()),
                dayName: current.format('dddd').toUpperCase(),
                monthName: current.format('MMMM').toUpperCase(),
                date: i
            });
        }

        setMonthDays(days);
    }, []);


    React.useEffect(() => {
        setSelectedDay(monthDays.find(item => item.day === moment(calendarDate).format('DD.MM.YYYY')) || null);
    }, [calendarDate, monthDays]);


    return (
        <>
            <MainHeaderSection extra_classes="subpage">

                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Wydarzenia" }]}/>
                <PageHeaderOrSlider page={props.page}/>

            </MainHeaderSection>

            <LoopSearchForm
                extraClasses={'gray'}
                type={'events'}
                submit_label={'SZUKAJ'}
                submitButtonExtraClasses={'small-filter-button'}
                submitCallback={(args) => {}}
            />

            {monthDays?.length && <DayCarousel days={monthDays}/>}

            {slides && (
                <Carousel
                    heading={'NAJBLIŻSZE WYDARZENIA'}
                    containerStyles={{marginLeft: '90px'}}
                    bodyStyles={{display: 'flex'}}
                    items={slides}
                    ItemComponent={LoopEventsPost}
                />
            )}

            <PageDescription
                logoText={pageDescription.title}
                descriptionText={pageDescription.description}
                buttonText={pageDescription.buttonText}
            />

            <MapWithPinsFiltering type="attractions" />
        </>
    )
}

export default EventsPage;