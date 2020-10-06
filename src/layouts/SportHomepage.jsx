import React from "react";
import Breadcrumbs from "../components/general/Breadcrumbs";
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import MainHeaderSection from "../components/header/MainHeaderSection";
import {getArticleLink} from "../extra/functions";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import {API} from "../extra/API";
import Row from "../components/helpers/Row";
import Card from "../components/StadiumReservationComponents/Card";

const SportHomepage = props => {
    const acf = props.page.acf;

    const [items1, setItems1] = React.useState(false);
    const [items2, setItems2] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(acf.field_information_modules_sport[0]).then(res => setItems1(res.data.contents));
        API.getByConfig(acf.field_information_modules_sport[1]).then(res => setItems2(res.data.contents));
    },[]);

    return (
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{label: "Visit.ustron.pl "}]} />
                <PageHeaderOrSlider page={props.page} />
            </MainHeaderSection>

            <TwoCarouselsOneRow
                first_carousel={{
                    loading: items1 === false,
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


        </>
    )
}

export default SportHomepage;