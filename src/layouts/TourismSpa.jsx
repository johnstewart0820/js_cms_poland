import React from 'react';
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import TextLinkPic from "../components/general/TextLinkPic";
import Parser from "html-react-parser";
import {API} from "../extra/API";
import YellowDiscountBlock from "../components/discounts/YellowDiscountBlock";
import LoopCard from "../components/loop/LoopCard";

export default function TourismSpa(props) {
    const [items, setItems] = React.useState(false);

    React.useEffect(() => {
        API.getByConfig(props.page.acf.field_informations_module_sanatoriums).then(res => setItems(res.data.contents));
    }, []);

    return (
        <>
            <MainHeaderSection>
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <PageHeaderOrSlider page={props.page}/>
            </MainHeaderSection>

            <TextLinkPic
                heading={props.page.acf.field_patients_title}
                text={Parser(props.page.acf.field_patients_description)}
            />

            <OneCarouseInRow carousel={{
                extra_classes: 'arrows-on-right',
                items: props.page.acf.field_offer_for_patients,
                ItemComponent: LoopCard,
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
                ItemComponent: LoopCard,
                path_to_all: getArticleLink(props.page.acf.field_informations_module_sanatoriums[0].field_section_watch_all_entity),
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
