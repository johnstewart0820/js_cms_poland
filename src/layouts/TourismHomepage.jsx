import React from 'react';
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import Breadcrumbs from '../components/general/Breadcrumbs';
import TextLinkPic from "../components/general/TextLinkPic";
import PicsTextLink from "../components/general/PicsTextLink";
import LoopAccommodationPost from '../components/accommodation/LoopAccommodationPost';
import LoopGastronomyPost from "../components/gastronomy/LoopGastronomyPost";
import LinksTiles from "../components/general/LinksTiles";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";

export default function MainPage(props) {
    const acf = props.page.acf;

    const [items1, setItems1] = React.useState(false);
    const [items2, setItems2] = React.useState(false);
    const [items3, setItems3] = React.useState(false);
    const [items4, setItems4] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(acf.field_information_modules_visit[0]).then(res => setItems1(res.data.contents));
        API.getByConfig(acf.field_information_modules_visit[1]).then(res => setItems2(res.data.contents));
        API.getByConfig(acf.field_visit_homepage_second_information_modules[0]).then(res => setItems3(res.data.contents));
        API.getByConfig(acf.field_visit_homepage_second_information_modules[1]).then(res => setItems4(res.data.contents));
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
                    path_to_all: getArticleLink(acf.field_information_modules_visit[0].field_section_watch_all_entity),
                    heading: acf.field_information_modules_visit[0].field_section_title_visit,
                    // TODO select entity renderer based on entity type
                    component: LoopEventsPost,
                    items: items1 || [],
                }}
                second_carousel={{
                    loading: items2 === false,
                    path_to_all: getArticleLink(acf.field_information_modules_visit[1].field_section_watch_all_entity),
                    heading: acf.field_information_modules_visit[1].field_section_title_visit,
                    // TODO select entity renderer based on entity type
                    component: LoopNewsPost,
                    items: items2 || [],
                }}
            />

            <PicsTextLink
                heading={acf.field_city_title}
                pics={acf.field_city.map(item => ({
                    label: item.field_city_photo_text,
                    url: item.field_city_photo,
                    link: item.field_city_link,
                }))}
                text={acf.field_city_description}
                link_label={acf.field_city_button_title}
                link={acf.field_city_button_link || '#'}
            />
            <PicsTextLink
                heading={acf.field_what_to_visit_title}
                pics={acf.field_what_to_visit.map(item => ({
                    label: item.field_what_to_visit_text,
                    url: item.field_what_to_visit_photo,
                    link: item.field_what_to_visit_link,
                }))}
                text={acf.field_what_to_visit_description}
                link_label={acf.field_what_to_visit_button_title}
                link={acf.field_city_button_link || '#'}
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
                    path_to_all: getArticleLink(acf.field_visit_homepage_second_information_modules[0].field_section_watch_all_entity),
                    heading: acf.field_visit_homepage_second_information_modules[0].field_section_title_visit,
                    component: LoopGastronomyPost,
                    items: items3 || [],
                }}
                second_carousel={{
                    loading: items4 === false,
                    path_to_all: getArticleLink(acf.field_visit_homepage_second_information_modules[1].field_section_watch_all_entity),
                    heading: acf.field_visit_homepage_second_information_modules[1].field_section_title_visit,
                    component: LoopAccommodationPost,
                    items: items4 || [],
                }}
            />

            <LinksTiles
                heading="Jak dojechać?"
                links={acf.field_how_to_get.map(item => ({href: item.field_how_to_get_link, label: item.field_how_to_get_text}))}
            />
        </>
    );
};
