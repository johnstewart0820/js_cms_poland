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
import {API} from "../extra/API";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";

const EventsPage = props => {
    const acf = props.page.acf;
    const [events, setEvents] = React.useState([]);
    const [data, setData] = React.useState(null);

    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [selectedDay, setSelectedDay] = React.useState(null);
    const prevCalendarDate = usePrevious(calendarDate);
    const [monthDays, setMonthDays] = React.useState([]);
    const [dateFrom, setDateFrom] = React.useState(null);
    const [dateTill, setDateTill] = React.useState(null);

    const fetchData = args => {
        API.getEntities({
            categories: acf.field_nearest_events_information_module[0].field_section_categories_visit,
            ...args,
        }).then(res => setData(res.data));
    }

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
        fetchData();
    },[]);

    React.useEffect(() => {
        if (!dateFrom || !dateTill || moment(dateFrom).isAfter(moment(dateTill)))
            return;

        const days = [];

        for (const cycleDate = moment(dateFrom); cycleDate.isSameOrBefore(dateTill); cycleDate.add('1', 'day')) {
            days.push({
                key: cycleDate.format('DD.MM.YYYY'),
                active: moment().isSame(cycleDate),
                onClick: () => setCalendarDate(cycleDate.toDate()),
                dayName: cycleDate.format('dddd').toUpperCase(),
                monthName: cycleDate.format('MMMM').toUpperCase(),
                date: cycleDate.date(),
            });
        }

        setMonthDays(days);

        fetchData({
            from: moment(dateFrom, 'DD.MM.YYYY')?.format('DD.MM.YYYY'),
            to: moment(dateTill, 'DD.MM.YYYY')?.format('DD.MM.YYYY'),
        });
    }, [dateFrom, dateTill]);

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
                submitCallback={(args) => {
                    setDateFrom(args.from);
                    setDateTill(args.to);
                }}
            />

            {monthDays?.length && <DayCarousel days={monthDays}/>}

            {data && (
                <Carousel
                    heading={'NAJBLIŻSZE WYDARZENIA'}
                    containerStyles={{marginLeft: '90px'}}
                    bodyStyles={{display: 'flex'}}
                    items={data.posts}
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