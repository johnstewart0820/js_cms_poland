import React from 'react';
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Parser from "html-react-parser";
import TextLinkPic from "../components/general/TextLinkPic";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import Loader from "../components/general/Loader";
import Card from "../components/StadiumReservationComponents/Card";
import Pagination from "../components/loop/Pagination";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import useEntities from "../hooks/useEntities";
import BikeRoutesCard from "../components/Cards/BikeRoutesCard";
import LoopSearchForm from "../components/loop/LoopSearchForm";
import {withDefaultOption} from "../extra/functions";
import Select from "../components/form/Select";
import useCustomField from "../hooks/useCustomField";
import {element} from "prop-types";

const SportBikesPage = props => {
    const container = React.useRef(null);
    const recommendedFor = useCustomField('recomended_for');
    const priceVariants = useCustomField('prices_variant');
    const [bikeRoads] = useEntities(props.page.acf.field_bike_trails_categories);
    const [filters, setFilters] = React.useState({
        page: 0,
    });

    const inputs = React.useMemo(() => {
        const fields = [];

        for (const field of [recommendedFor]) {
            if (!field)
                return null;

            fields.push({
                label: field.label,
                name: field.key,
                options: withDefaultOption(Object.keys(field.choices).map(key => ({value: key, label: field.choices[key]}))),
                Component: Select,
            });
        }
        return fields;
    },[recommendedFor]);

    const OrderOptions = [
        {value: 'desc', label: 'NajNOWSZE'},
        {value: 'asc', label: 'Najstarsze'},
    ];

    const changeSort = e => setFilters({...filters, order: e.target.value});

    const onPageChange = page => {
        setFilters({...filters, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl ", to: '/'}, {label: 'Rower'}]} />
                <PageHeaderOrSlider page={props.page} />
            </MainHeaderSection>

            <TextLinkPic
                heading={props.page.acf.field_bikes_title}
                text={Parser(props.page.acf.field_bikes_description || '')}
            />

            <LoopSearchForm
                heading="trasa Rowerowa"
                inputs={[{
                    label: 'Polecane dla ',
                    name: 'category_id',
                    selectImageColor: 'green',
                    options: withDefaultOption( []),
                    Component: Select,
                },
                {
                    label: 'trasa Rowerowa',
                    name: 'category_id',
                    selectImageColor: 'green',
                    options: withDefaultOption( []),
                    Component: Select,
                },
                {
                    label: 'Odległość',
                    name: 'category_id',
                    selectImageColor: 'green',
                    options: withDefaultOption( []),
                    Component: Select,
                }]}
                submit_label={'FILTRUJ'}
                submitCallback={() => {}}
            />

            <LoopSearchPostsContainer
                heading={props.page.acf.field_bike_trails_title}
                sort_options={OrderOptions}
                sortOnChange={changeSort}
            >
                {bikeRoads === null && <Loader/>}
                {!!bikeRoads?.contents && (
                    <>
                        {bikeRoads.contents.map(post => <BikeRoutesCard key={post.id} {...post} />)}

                        <Pagination
                            active_page={bikeRoads.pages.currentPage}
                            total_amount={bikeRoads.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

            <MapWithPinsFiltering map_id={props.page.acf.field_bikes_map}/>
        </>
    )
}

export default SportBikesPage;