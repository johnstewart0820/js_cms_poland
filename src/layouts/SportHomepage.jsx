import React from "react";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import {getArticleLink} from "../extra/functions";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import {API} from "../extra/API";
import RowWithCards from "../components/sport/RowWithCards";
import RopeRoad from "../components/sport/RopeRoad";
import PicTextInfo from "../components/general/PicTextInfo";
import LinksTiles from "../components/general/LinksTiles";

const items = [
    {
        title: 'Lol',
        address: '43-540 Test lol',
        number: '743823',
        email: 'georgetest@gmail.com',
        site: 'www.test.com'
    },
    {
        title: 'Test',
        address: '43-540 Test lol',
        number: '743823',
        email: 'georgetest@gmail.com',
        site: 'www.test.com'
    },
    {
        title: 'Kek',
        address: '43-540 Test lol',
        number: '743823',
        email: 'georgetest@gmail.com',
        site: 'www.test.com'
    },
    {
        title: 'Nice',
        address: '43-540 Test lol',
        number: '743823',
        email: 'georgetest@gmail.com',
        site: 'www.test.com'
    },
];

const SportHomepage = props => {
    const acf = props.page.acf;
    const [items1, setItems1] = React.useState(false);
    const [items2, setItems2] = React.useState(false);
    const [courts, setCourts] = React.useState([]);
    const [cableWays, setCableWays] = React.useState([]);
    const [activities, setActivities] = React.useState([]);

    React.useEffect(() => {
        API.getByConfig(acf.field_information_modules_sport[0]).then(res => setItems1(res.data.contents));
        API.getByConfig(acf.field_information_modules_sport[1]).then(res => setItems2(res.data.contents));
        API.getEntities({categories: acf.field_sports_ground_categories[0]}).then(res => setCourts(res.data.contents));
        API.getEntities({categories: acf.field_cableways_categories[0]}).then(res => setCableWays(res.data.contents));
    },[]);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "sport.ustron.pl "}]} />
                <PageHeaderOrSlider page={props.page} />
            </MainHeaderSection>

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items1 === false,
                    path_to_all: getArticleLink(acf.field_information_modules_sport[0].field_section_watch_all_entity),
                    heading: acf.field_information_modules_sport[0].field_section_title_visit,
                    component: LoopEventsPost,
                    items: items1 || [],
                }}
                second_carousel={{
                    loading: items2 === false,
                    path_to_all: getArticleLink(acf.field_information_modules_sport[1].field_section_watch_all_entity),
                    heading: acf.field_information_modules_sport[1].field_section_title_visit,
                    component: LoopNewsPost,
                    items: items2 || [],
                }}
            />

            <RowWithCards
                items={courts}
                containerTitle={acf.field_sports_ground_title}
                linkToAll={getArticleLink(props.page.acf.field_sports_ground_page)}
                headingLinkText={'ZOBACZ WSZYSTKIE'}
            />

            {cableWays.length > 0 && (
                <RopeRoad
                    heading={acf.field_cableways_title}
                    headingText={acf.field_cableways_description}
                    items={cableWays}
                />
            )}

            <PicTextInfo
                href={acf.field_icerink_button_link || '#'}
                link_label={acf.field_icerink_button_title}
                heading={acf.field_icerink_title}
                text={`ADRES: ${acf.field_icerink_description}`}
                picture_url={acf.field_icerink_photo}
            />

            <RowWithCards

            />

            <LinksTiles
                heading={acf.field_practical_information_title}
                links={acf.field_practical_information.map(item => ({href: item.field_information_link || '', label: item.field_information_description}))}
            />
        </>
    )
}

export default SportHomepage;