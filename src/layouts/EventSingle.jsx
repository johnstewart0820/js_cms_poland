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
import Questionnaire from "../components/questionnaire/Questionnaire";
import LoopCard from "../components/loop/LoopCard";

export default function EventSingle(props) {
    const planerContext = React.useContext(PlanerContext);
    const [items, setItems] = React.useState(null);
    const [isPollHere, setIsPollHere] = React.useState(null);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories}).then(res => setItems(res.data.contents));
    }, []);

    function checkDuplicateItem() {
        let isDuplicate = planerContext.ids.includes(props.page.id);

        if (isDuplicate === true) return null;
        else return planerContext.add(props.page.id);
    }

    const getPollId = () => {
        const isPollHere = props.page.body.includes('[[Poll/');
       return isPollHere;
    }
    const a = getPollId();
    console.log(a)

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <EventSingleHead {...props.page}/>
            </MainHeaderSection>

            <SingleContainer>
                {props.page.body && (<div>{Parser(props.page.body)}</div>)}
                <Questionnaire getPollId={getPollId}/>
                <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>
            </SingleContainer>

            <OneCarouseInRow carousel={{
                loading: items === null,
                heading: 'Inne wydarzenia',
                ItemComponent: LoopCard,
                items: items || [],
            }}/>
        </>
    );
}
