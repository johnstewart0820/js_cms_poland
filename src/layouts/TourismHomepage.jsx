import React from 'react';
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import Breadcrumbs from '../components/general/Breadcrumbs';
import TextLinkPic from "../components/general/TextLinkPic";
import PicsTextLink from "../components/general/PicsTextLink";
import PicturesSlider from "../components/slider/PicturesSlider";
import LoopAccommodationPost from '../components/accommodation/LoopAccommodationPost';
import LoopGastronomyPost from "../components/gastronomy/LoopGastronomyPost";
import LinksTiles from "../components/general/LinksTiles";
import { sample_slides as slides } from "../mock/slides_example";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";

export default function MainPage(props) {
    const acf = props.page.acf;

    const [items1, setItems1] = React.useState(false);
    const [items2, setItems2] = React.useState(false);
    const [items3, setItems3] = React.useState(false);
    const [items4, setItems4] = React.useState(false);

    React.useEffect(() => {
        API.getEntities({
            categories: acf.field_information_modules_visit[0].field_section_categories_visit,
        }).then(res => setItems1(res.data.contents));

        API.getEntities({
            categories: acf.field_information_modules_visit[1].field_section_categories_visit,
        }).then(res => setItems2(res.data.contents));

        API.getEntities({
            categories: acf.field_gastronomic_categories,
        }).then(res => setItems3(res.data.contents));

        API.getEntities({
            categories: acf.field_accommodation_categories,
        }).then(res => setItems4(res.data.contents));
    }, []);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl "}]} />
                <PageHeaderOrSlider page={props.page} />
            </MainHeaderSection>

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items1 === false,
                    path_to_all: '#',
                    heading: acf.field_information_modules_visit[0].field_section_title_visit,
                    component: LoopEventsPost,
                    items: items1 || [],
                }}
                second_carousel={{
                    loading: items2 === false,
                    path_to_all: '#',
                    heading: acf.field_information_modules_visit[1].field_section_title_visit,
                    component: LoopNewsPost,
                    items: items2 || [],
                }}
            />

            <PicsTextLink
                heading={acf.field_city_title}
                pics={acf.field_city.map(item => ({label: item.field_city_photo_text, url: item.field_city_photo}))}
                text={acf.field_city_description}
                link_label={acf.field_city_button_title}
                link={'#'}
            />
            <PicsTextLink
                heading={acf.field_what_to_visit_title}
                pics={acf.field_what_to_visit.map(item => ({label: item.field_what_to_visit_text, url: item.field_what_to_visit_photo}))}
                text={acf.field_what_to_visit_description}
                link_label={acf.field_what_to_visit_button_title}
                link={'#'}
            />

            <TextLinkPic
                heading={acf.field_spa_title}
                picture={acf.field_spa_photo}
                text={acf.field_spa_description}
                link_label={acf.field_spa_button_title}
                link={'#'}
            />

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items3 === false,
                    path_to_all: '#',
                    heading: acf.field_gastronomic_title,
                    component: LoopGastronomyPost,
                    items: items3 || [],
                }}
                second_carousel={{
                    loading: items4 === false,
                    path_to_all: '#',
                    heading: acf.field_accommodation_title,
                    component: LoopAccommodationPost,
                    items: items4 || [],
                }}
            />

            <LinksTiles
                heading="Jak dojechać?"
                links={acf.field_how_to_get.map(item => ({href: '#'/*item.field_how_to_get_link*/, label: item.field_how_to_get_text}))}
            />
        </>
    );
};
