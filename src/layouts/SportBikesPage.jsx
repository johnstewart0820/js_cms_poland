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

const SportBikesPage = props => {
    const container = React.useRef(null);
    const [bikeRoads] = useEntities(props.page.acf.field_bike_trails_categories);
    const [filters, setFilters] = React.useState({
        page: 0,
    });

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

            <LoopSearchPostsContainer
                heading={props.page.acf.field_bike_trails_title}
                sort_options={OrderOptions}
                sortOnChange={changeSort}
            >
                {bikeRoads === null && <Loader/>}
                {!!bikeRoads?.contents && (
                    <>
                        {bikeRoads.contents.map(post => <Card key={post.id} {...post} />)}

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