import React from 'react';
import {API} from "../extra/API";
import {getArticleLink} from "../extra/functions";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import Loader from "../components/general/Loader";
import RowWithCards from "../components/sport/RowWithCards";

export default function SportCourts(props) {
    const [items, setItems] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(props.page.acf.field_sports_ground_information_modules).then(res => setItems(res.data.contents));
    }, []);

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={[
                    {label: "Visit.ustron.pl", to: "/"},
                    {label: props.page.title, to: getArticleLink(props.page)},
                ]}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            {items === false && <Loader/>}
            {items !== false && !items?.length && (
                <h2 style={{textAlign: 'center', width: '100%'}}>
                    Brak treści dla podanych kryteriów
                </h2>
            )}
            {items?.length && (
                <RowWithCards
                    containerTitle={props.page.acf.field_sports_ground_information_modules[0].field_section_title_visit}
                    items={items || []}
                />
            )}

            <MapWithPinsFiltering map_id={props.page.acf.field_sports_ground_map}/>
        </>
    );
};
