import React from "react";
import {API} from "../extra/API";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Breadcrumbs from "../components/general/Breadcrumbs";
import EventSingleHead from "../components/events/EventSingleHead";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";
import PlanerContext from "../constants/PlanerContext";
import LoopCard from "../components/loop/LoopCard";
import {parserShortcodes} from "../extra/functions";
import Gallery from "../components/gallery/Gallery";
import Loader from "../components/general/Loader";
import Video from "../components/general/Video";
import Attachment from "../components/general/Attachment";

export default function EventSingle(props) {
    const planerContext = React.useContext(PlanerContext);
    const [items, setItems] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const [galleryBoard, setGalleryBoard] = React.useState([]);


    React.useEffect(() => {
        props.page.gallery.forEach(element => {
            galleryBoard.push({
                description: element.description,
                name: "",
                title: element.title,
                url: element.name,
            })
        });
        setLoading(false);
        setGalleryBoard(galleryBoard)
    }, [props.page.gallery]);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories}).then(res => setItems(res.data.contents));
    }, []);

    function checkDuplicateItem() {
        let isDuplicate = planerContext.ids.includes(props.page.id);

        if (isDuplicate === true) return null;
        else return planerContext.add(props.page.id);
    }

    if (!!loading)
        return <Loader/>


    return (
        <>

            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <EventSingleHead {...props.page}/>
            </MainHeaderSection>

            <div className="section-info">
                {props.page.body && (<div>{parserShortcodes(props.page.body)}</div>)}
            </div>
            <div className="section-info">
                {props.page.video.length !== 0 && <Video video={props.page.video.embed}/>}
            </div>

            {props.page.gallery && <Gallery items={galleryBoard}/>}
            {props.page.attachments.length!==0 && <Attachment attachments={props.page.attachments}/>}
            <div className="section-info">
                <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>
            </div>

            <OneCarouseInRow carousel={{
                loading: items === null,
                heading: 'Inne wydarzenia',
                ItemComponent: LoopCard,
                items: items || [],
            }}/>
        </>
    );
}
