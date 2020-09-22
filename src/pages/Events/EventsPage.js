import React from "react";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PicturesSlider from "../../components/slider/PicturesSlider";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import {CameraIcon, LogoWhite} from "../../svg/icons";
import '../../styles/EventsPage/EventsPage.scss';
import Row from "../../components/helpers/Row";
import InputComponent from "../../components/form/InputComponent";
import Select from "../../components/form/Select";
import {Calendar} from "react-calendar";
import moment from "moment";
import '../../styles/Calendar/Calendar.scss';
import usePrevious from "../../hooks/usePrevious";
import Carousel from "../../components/carousel/Carousel";
import DayButton from "../../components/StadiumReservationComponents/DayButton";
import {API, MOCK_API} from "../../extra/API";
import LoopEventsPost from "../../components/events/LoopEventsPost";
import Col from "../../components/helpers/Col";
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import LoopSearchForm from "../../components/loop/LoopSearchForm";
import {PageDescription} from "../../components/events/PageDescription";
import {DayCarousel} from "../../components/events/DayCarousel";

const sampleSlides = [
    { url: "/img/slides/tourism-main.jpg" },
    {
        url: "/img/slides/tourism-1.jpg",
        top_link: "/camera",
        top_link_label: "Kamery internetowe",
        top_link_svg: <CameraIcon />
    },
    {
        url: "/img/slides/tourism-2.jpg",
        title: "Amfiteatr",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        link: "/blalba",
        link_label: "dowiedz się wiecej"
    }
];

const selectData = [
    {
        value: 'test1',
        label: 'Test',
    },
    {
        value: 'test2',
        label: 'Test',
    },
];

const pageDescriptionText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam\n' +
    'nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\n' +
    'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper\n' +
    'suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel\n' +
    'eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,';

const daysData = [
    {
        day: '01.09.2020'
    },
    {
        day: '02.09.2020'
    },
    {
        day: '03.09.2020'
    },
    {
        day: '04.09.2020'
    },
    {
        day: '05.09.2020'
    },
    {
        day: '06.09.2020'
    },
    {
        day: '07.09.2020'
    },
    {
        day: '08.09.2020'
    },
    {
        day: '09.09.2020'
    },
    {
        day: '10.09.2020'
    },
    {
        day: '11.09.2020'
    },
    {
        day: '12.09.2020'
    },
    {
        day: '13.09.2020'
    },
    {
        day: '14.09.2020'
    },
    {
        day: '15.09.2020'
    },
    {
        day: '16.09.2020'
    },
    {
        day: '17.09.2020'
    },
    {
        day: '18.09.2020'
    },
    {
        day: '19.09.2020'
    },
    {
        day: '20.09.2020'
    },
    {
        day: '21.09.2020'
    },
    {
        day: '22.09.2020'
    },
];

const EventsPage = () => {
    const [slides, setSlides] = React.useState(sampleSlides);
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [show, setShow] = React.useState(false);
    const [days, setDays] = React.useState([]);
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [events, setEvents] = React.useState([]);
    const prevCalendarDate = usePrevious(calendarDate);

    React.useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        API.get(`contents/events?limit=5`)
        .then( res => setEvents(res.data.contents))
        .catch( err => console.log(err));
    }

    React.useEffect(() => {
        daysData.map((item) => {
            const date = moment(item.day, 'DD.MM.YYYY');
            const convertedDate = date.format('DD.MM.YYYY');
            const convertedCalendarDate = moment(calendarDate).format('DD.MM.YYYY');
            return days.push({
                key: item.day,
                active: (convertedDate === convertedCalendarDate),
                onClick: () => setCalendarDate(date.toDate()),
                dayName: date.format('dddd').toUpperCase(),
                monthName: date.format('MMMM').toUpperCase(),
                date: date.format('DD')
            });
        })
    }, [daysData]);

    React.useEffect(() => {
        setSelectedDay(days.find(item => item.day === moment(calendarDate).format('DD.MM.YYYY')) || null);
    }, [calendarDate, days]);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">

                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Wydarzenia" }]} />
                <PicturesSlider slides={ slides } />

            </MainHeaderSection>

            <LoopSearchForm
                extraClasses={'gray'}
                type={'events'}
                submit_label={'SZUKAJ'}
                submitButtonExtraClasses={'small-filter-button'}
                submitCallback={(args) => {}}
            />

            <DayCarousel days={days}/>

            {events.length > 0 && (
                <Carousel heading="Najbliższe wydarzenia" containerStyles={{marginLeft: '90px'}} bodyStyles={{display: 'flex'}} items={events} ItemComponent={LoopEventsPost}/>
            )}

            <PageDescription
                logoText={'zgłos imprezę'}
                descriptionText={pageDescriptionText}
                buttonText={'zgłos imprezę'}
            />

            <MapWithPinsFiltering type="attractions" />
        </>
    )
}

export default EventsPage;