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

const dateOrDate = (firstDate, secondDate) => {
    if (!firstDate && !secondDate)
        return null;

    return moment(firstDate || secondDate).format('DD.MM.YYYY');
};

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
    const [filterArgs, setFilterArgs] = React.useState({});

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

    const onFiltersSubmit = args => {
        setSelectedDate(null);
        handleFilteringCategories(args, acf.field_nearest_events_information_module[0].field_section_categories_visit);
        setFilterArgs(args);
    };

    const onReset = () => {
        setFilterArgs({});
        setSelectedDate(null);
    };

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

            <DayCarousel
                startDate={moment().subtract(3, 'days')}
                selectedDate={selectedDate}
                onDayClick={date => setSelectedDate(date)}
                amount={7}
            />

            {data === null && <Loader/>}
            {data !== null && !data?.contents.length && (
                <h2 style={{textAlign: 'center', width: '100%'}}>
                    Brak treści dla podanych kryteriów
                </h2>
            )}
            {!!data?.contents && (
                <Carousel
                    heading={'NAJBLIŻSZE WYDARZENIA'}
                    containerStyles={{marginLeft: '90px'}}
                    bodyStyles={{display: 'flex'}}
                    items={data.contents}
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
