import React, { Component } from "react";
import Parser from "html-react-parser";
import { API } from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Loader from "../components/general/Loader";
import Breadcrumbs from "../components/general/Breadcrumbs";
import EventSingleHead from "../components/events/EventSingleHead";
import LoopEventsPost from "../components/events/LoopEventsPost";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";
import LoopNewsPost from "../components/news/LoopNewsPost";

export default function TourismEventSingle(props) {
    const  [items, setItems] = React.useState(null);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories}).then(res => {console.log(res)
        setItems(res.data.contents)});

    }, []);

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]} />
                <EventSingleHead {...props.page} />
            </MainHeaderSection>
            {props.page.body && (
                <SingleContainer >
                    <div> {Parser(props.page.body)} </div>
                    <SingleContentBottom />
                </SingleContainer>
            )}
            <OneCarouseInRow carousel={{
                loading: true ,
                heading: 'Inne wydarzenia',
                ItemComponent: LoopEventsPost,
                items: items || [],
            }} />
        </>
    );
}
