import React from "react";
import Parser from "html-react-parser";
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Breadcrumbs from "../components/general/Breadcrumbs";
import EventSingleHead from "../components/events/EventSingleHead";
import LoopEventsPost from "../components/events/LoopEventsPost";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";

export default function EventSingle(props) {
    const [items, setItems] = React.useState(null);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories}).then(res => setItems(res.data.contents));
    }, []);

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <EventSingleHead {...props.page}/>
            </MainHeaderSection>
            {props.page.body && (
                <SingleContainer>
                    <div>{Parser(props.page.body)}</div>
                    <SingleContentBottom/>
                </SingleContainer>
            )}
            <OneCarouseInRow carousel={{
                loading: items === null,
                heading: 'Inne wydarzenia',
                ItemComponent: LoopEventsPost,
                items: items || [],
            }}/>
        </>
    );
}
