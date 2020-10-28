import React from "react";
import moment from "moment";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from "../components/general/Breadcrumbs";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import Carousel from "../components/carousel/Carousel";
import {PageDescription} from "../components/events/PageDescription";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import '../styles/EventsPage/EventsPage.scss';
import {API} from "../extra/API";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import InputComponent from "../components/form/InputComponent";
import {DatePicker} from "../components/form/DatePicker";
import Select from "../components/form/Select";
import useOrganizers from "../hooks/useOrganizers";
import Loader from "../components/general/Loader";
import {getMailToLink, handleFilteringCategories, withDefaultOption} from "../extra/functions";
import {DayCarousel} from "../components/events/DayCarousel";
import LoopCard from "../components/loop/LoopCard";
import useEntitiesByConfig from "../hooks/useEntitiesByConfig";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import Pagination from "../components/loop/Pagination";
import DayButton from "../components/StadiumReservationComponents/DayButton";
import {number} from "prop-types";

const dateOrDate = (firstDate, secondDate) => {
    if (!firstDate && !secondDate)
        return null;

    return moment(firstDate || secondDate).format('DD.MM.YYYY');
};

const DefaultFilters = {page: 0};

const EventsPage = props => {
    const acf = props.page.acf;
    const organizers = useOrganizers(true);
    const categoriesOptions = React.useMemo(() => {
        return withDefaultOption([
            ...acf.field_nearest_events_information_module[0].field_section_categories_visit.map(category => ({
                key: category.id,
                value: category.id,
                label: category.name,
            })),
        ]);
    }, []);
    const [data, setData] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [carouselDates, setCarouselDates] = React.useState(null);
    const [filterArgs, setFilterArgs] = React.useState(DefaultFilters);
    const [nearestEvents, nearestLoading] = useEntitiesByConfig({
        ...acf.field_nearest_events_information_module[0],
        field_section_posts_count_visit: 3,
    });
    const [allEvents] = useEntitiesByConfig(acf.field_nearest_events_information_module, React.useMemo(() => ({
        limit: 99999,
        orderby: 'date',
        order: 'asc',
        date: moment().format('DD.MM.YYYY'),
        date_to: moment().add(180, 'days').format('DD.MM.YYYY'),
    }), []));

    /* fetch new data */
    React.useEffect(() => {
        setData(null);
        API.getByConfig(acf.field_nearest_events_information_module, {
            ...filterArgs,
            date: dateOrDate(selectedDate, filterArgs.date),
            date_to: dateOrDate(selectedDate, filterArgs.date_to),
        }).then(res => {
            setData(res.data);
        }).catch(err => {
            console.error(err);
            setData(false);
        });
    }, [filterArgs, selectedDate]);

    React.useEffect(() => {
        if (!allEvents?.contents)
            return;

        const startDate = moment(moment().format('DD.MM.YYYY'), 'DD.MM.YYYY');
        const endDate = startDate.clone().add(180, 'days');
        const dates = [];

        for (const cycleDate = startDate.clone(); cycleDate.isSameOrBefore(endDate); cycleDate.add(1, 'day')) {
            const cycleClone = moment(cycleDate.format('DD.MM.YYYY'), 'DD.MM.YYYY');
            for (const event of allEvents.contents) {
                const eventStart = moment.utc(event.event_start_date);
                const eventEnd = moment.utc(event.event_end_date);

                if (eventStart.isAfter(endDate) || eventEnd.isBefore(startDate))
                    continue;

                dates.push({
                    number: cycleDate.date(),
                    onClick: () => setSelectedDate(cycleClone),
                    date: cycleClone,
                    dayName: cycleDate.format('dddd').toUpperCase(),
                    monthName: cycleDate.format('MMMM').toUpperCase(),
                });
                break;
            }
        }

        setCarouselDates(dates);
    }, [allEvents]);

    const onFiltersSubmit = args => {
        setSelectedDate(null);
        handleFilteringCategories(args, acf.field_nearest_events_information_module[0].field_section_categories_visit);
        setFilterArgs({
            ...args,
            page: 0,
        });
    };

    const onReset = () => {
        setFilterArgs(DefaultFilters);
        setSelectedDate(null);
    };

    const onPageChange = page => setFilterArgs({...filterArgs, page});

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <LoopSearchForm
                extraClasses={'gray'}
                showResetButton={true}
                onReset={onReset}
                inputs={[
                    {
                        fieldName: 'NAZWA WYDARZENIA',
                        name: 'query',
                        Component: InputComponent,
                    },
                    {
                        label: 'OD',
                        name: 'date',
                        Component: DatePicker,
                    },
                    {
                        label: 'DO',
                        name: 'date_to',
                        Component: DatePicker,
                    },
                    {
                        label: 'Organizator',
                        name: 'organizer_id',
                        extra_classes: 'select-small',
                        selectImageColor: 'green',
                        options: withDefaultOption(organizers || []),
                        Component: Select,
                    },
                    {
                        label: 'KATEGORIA',
                        name: 'categories',
                        selectImageColor: 'green',
                        extra_classes: 'select-small',
                        options: categoriesOptions,
                        Component: Select,
                    },
                ]}
                submit_label={'SZUKAJ'}
                submitButtonExtraClasses={'small-filter-button'}
                submitCallback={onFiltersSubmit}
            />

            {carouselDates === null && <Loader/>}
            {carouselDates?.length && (
                <Carousel
                    extra_classes={'arrows-on-right'}
                    containerStyles={{marginLeft: '90px'}}
                    items={carouselDates}
                    ItemComponent={DayButton}
                    shared={{selectedDate}}
                />
            )}

            {/*<DayCarousel
                startDate={moment().subtract(3, 'days')}
                selectedDate={selectedDate}
                onDayClick={date => setSelectedDate(date)}
                amount={7}
            />*/}

            <LoopSearchPostsContainer extra_classes={'wider'}>
                {data === null && <Loader/>}

                {!!data?.contents && (
                    <>
                        {!data.contents.length && (
                            <h2 style={{textAlign: 'center', width: '100%'}}>
                                Brak treści dla podanych kryteriów
                            </h2>
                        )}
                        {data.contents.map(post => <LoopCard key={post.id} {...post} />)}

                        <Pagination
                            active_page={data.pages.currentPage}
                            total_amount={data.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

            {nearestLoading && <Loader/>}
            {!nearestLoading && nearestEvents?.contents?.length && (
                <Carousel
                    heading={'NAJBLIŻSZE WYDARZENIA'}
                    extra_classes={'no-arrows'}
                    containerStyles={{marginLeft: '90px'}}
                    bodyStyles={{display: 'flex'}}
                    items={nearestEvents.contents}
                    ItemComponent={LoopCard}
                />
            )}

            <PageDescription
                logoText={acf.field_new_event_title}
                descriptionText={acf.field_new_event_description}
                buttonText={acf.field_new_event_button_title}
                href={getMailToLink(acf.field_new_event_button_mail_address, {subject: acf.field_new_event_button_mail_heading})}
            />

            <MapWithPinsFiltering map_id={acf.field_new_event_map}/>
        </>
    );
};

export default EventsPage;
