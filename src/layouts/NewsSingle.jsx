import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import NewsSingleHead from "../components/news/NewsSingleHead";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";
import {API} from "../extra/API";
import PlanerContext from "../constants/PlanerContext";
import LoopCard from "../components/loop/LoopCard";
import {parserShortcodes} from "../extra/functions";
import Video from "../components/general/Video";
import Attachment from "../components/general/Attachment";
import Loader from "../components/general/Loader";

export default function NewsSinglePage(props) {
    const planerContext = React.useContext(PlanerContext);
    const [news, setNews] = React.useState(null);
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
        API.getEntities({categories: props.page.categories})
            .then(res => setNews(res.data.contents))
            .catch(e => {
                console.error(e);
                setNews(false);
            });
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
                <NewsSingleHead {...props.page}/>
            </MainHeaderSection>

            {props.page.body && (
                <SingleContainer extra_classes="single-news-container">
                    <div>{parserShortcodes(props.page.body)}</div>
                    {props.page.acf.field_map_gps &&
                    <SingleContentBottom onAddToPlaner={checkDuplicateItem}/>}
                </SingleContainer>
            )}

            {props.page.video.length !== 0 && <Video video={props.page.video.embed}/>}

            {props.page.attachments.length !== 0 && <Attachment attachments={props.page.attachments}/>}

            {props.page.gallery && <Gallery items={galleryBoard}/>}

            {news !== false && (
                <OneCarouseInRow carousel={{
                    loading: news === null,
                    heading: 'Ostatnie aktualno??ci',
                    ItemComponent: LoopCard,
                    items: news || [],
                }}/>
            )}
        </>
    );
};