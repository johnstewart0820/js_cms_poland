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
import PlanerContext from "../constants/PlanerContext";

export default function EventSingle(props) {
    const planerContext = React.useContext(PlanerContext);
    const [items, setItems] = React.useState(null);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories}).then(res => setItems(res.data.contents));
    }, []);

    function checkDuplicateItem() {
        let isDuplicate = planerContext.ids.includes(props.page.id);

        if (isDuplicate === true) return null;
        else return planerContext.add(props.page.id);
    }

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <EventSingleHead {...props.page}/>
            </MainHeaderSection>
            {props.page.body && (
                <SingleContainer>
                    <div>{Parser(props.page.body)}</div>
                    <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>
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
