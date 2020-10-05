import React from 'react';
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";
import LoopSpaPost from "../components/spa/LoopSpaPost";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import TextLinkPic from "../components/general/TextLinkPic";
import Parser from "html-react-parser";
import {API} from "../extra/API";
import LoopAccommodationPost from "../components/accommodation/LoopAccommodationPost";
import YellowDiscountBlock from "../components/discounts/YellowDiscountBlock";

export default function TourismSpa(props) {
    const [items, setItems] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(props.page.acf.field_informations_module_sanatoriums).then(res => setItems(res.data.contents));
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

            <TextLinkPic
                heading={props.page.acf.field_patients_title}
                text={Parser(props.page.acf.field_patients_description)}
            />

            <OneCarouseInRow carousel={{
                extra_classes: 'arrows-on-right',
                items: props.page.acf.field_offer_for_patients,
                ItemComponent: LoopSpaPost,
            }}/>

            <TextLinkPic
                heading={props.page.acf.field_spa_town_history_title}
                text={Parser(props.page.acf.field_spa_town_history_descriprion)}
                picture={props.page.acf.field_spa_town_history_photo}
            />

            <OneCarouseInRow carousel={{
                extra_classes: 'no-arrows',
                heading: props.page.acf.field_informations_module_sanatoriums[0].field_section_title_visit,
                items: items || [],
                ItemComponent: LoopAccommodationPost,
                path_to_all: getArticleLink(props.page.acf.field_informations_module_sanatoriums[0].field_section_watch_all_entity)
            }}/>

            <OneCarouseInRow carousel={{
                extra_classes: 'arrows-on-right',
                heading: props.page.acf.field_promotions_title,
                items: props.page.acf.field_promotions_list,
                ItemComponent: YellowDiscountBlock,
            }}/>
        </>
    );
};
