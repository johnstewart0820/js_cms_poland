import React from 'react';
import Card from "../components/StadiumReservationComponents/Card";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import useEntities from "../hooks/useEntities";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import LoopSearchPostsContainer from "../components/loop/LoopSearchPostsContainer";
import Loader from "../components/general/Loader";
import Pagination from "../components/loop/Pagination";

const SportTenisCourts = (props) => {
    const container = React.useRef(null);
    const [tennisCourts] = useEntities(props.page.acf.field_tennis_courts_categories);
    const [filters, setFilters] = React.useState({
        page: 0,
    });

    const onPageChange = page => {
        setFilters({...filters, page});
        window.scrollTo({top: container.current.getBoundingClientRect().top + window.scrollY});
    };

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "sport.ustron.pl "}]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <LoopSearchPostsContainer
                heading={props.page.acf.field_tennis_courts_title}
            >
                {tennisCourts === null && <Loader/>}
                {!!tennisCourts?.contents && (
                    <>
                        {tennisCourts.contents.map(post => <Card key={post.id} {...post} />)}

                        <Pagination
                            active_page={tennisCourts.pages.currentPage}
                            total_amount={tennisCourts.pages.pageCount}
                            pageChangeCallback={onPageChange}
                        />
                    </>
                )}
            </LoopSearchPostsContainer>

            {!!props.page.acf?.field_tennis_courts_map && <MapWithPinsFiltering map_id={props.page.acf.field_tennis_courts_map}/>}
        </>
    )
}

export default SportTenisCourts;