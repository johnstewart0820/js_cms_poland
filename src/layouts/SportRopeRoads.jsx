import React from 'react';
import MainHeaderSection from "../components/header/MainHeaderSection";
import Breadcrumbs from '../components/general/Breadcrumbs';
import PageHeaderOrSlider from "../extra/PageHeaderOrSlider";
import {getArticleLink} from "../extra/functions";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import TextLinkPic from "../components/general/TextLinkPic";
import Parser from "html-react-parser";
import {API} from "../extra/API";
import Loader from "../components/general/Loader";
import RopeRoadCard from "../components/sport/RopeRoadCard";

export default function SportRopeRoads(props) {
    const [items, setItems] = React.useState(false);

    React.useEffect(() => {
        API.getEntities({categories: props.page.acf.field_cableways_categories}).then(res => setItems(res.data.contents));
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
                heading={props.page.acf.field_cableways_title}
                text={Parser(props.page.acf.field_cableways_description)}
            />

            {items === false && <Loader/>}
            {items !== false && !items?.length && (
                <h2 style={{textAlign: 'center', width: '100%'}}>
                    Brak treści dla podanych kryteriów
                </h2>
            )}
            {!!items && (
                <OneCarouseInRow carousel={{
                    extra_classes: 'arrows-on-right',
                    items: items || [],
                    ItemComponent: RopeRoadCard,
                }}/>
            )}
        </>
    );
};
