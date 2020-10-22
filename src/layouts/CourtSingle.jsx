import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import {API} from "../extra/API";
import axios from "../extra/axios";
import '../styles/attractions/attraction-single-page.scss'
import GoogleMap from "../components/map/GoogleMap";
import CourtSingleHead from "../components/courts/CourtSingleHead";
import Loader from "../components/general/Loader";
import LoopCard from "../components/loop/LoopCard";
import {parserShortcodes} from "../extra/functions";
import Video from "../components/general/Video";
import SingleContainer from "../components/common-single/SingleContainer";
import Attachment from "../components/general/Attachment";

export default function AttractionSingle(props) {
    const pageId = props.page.id;
    let keyId = 0;

    const categories = props.page.categories;
    const {field_map_gps, field_service_languages} = props.page.acf;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [galleryBoard, setGalleryBoard] = React.useState([]);
    const [worthSeeing, setWorthSeeing] = React.useState(props.page.acf.field_worth_seeing);


    React.useEffect(() => {
        API.getEntities({categories: categories})
            .then(res => setNews(res.data.contents))
            .catch(e => {
                console.error(e);
                setNews(false);
            });
    }, []);

    React.useEffect(() => {
        axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${pageId}`)
            .then((res) => {
                setDate(res.data.content)
            })
    }, []);


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
        if (worthSeeing) {
            worthSeeing.forEach(element => {
                worthSeeing.push({
                    link: element.field_worth_seeing_link,
                    title: element.field_worth_seeing_title,
                    url: element.field_worth_seeing_photo,
                });
            });
        }
        setLoading(false);
    }, [worthSeeing]);


    if (!!loading)
        return <Loader/>


    let coords = [];
    if (field_map_gps) {
        var gps = field_map_gps.split(';');
        coords.push({
            lat: gps[0],
            lng: gps[1],
        });
    }

    if (field_service_languages) {
        var nameOfLanguage = field_service_languages.map(el => {
                if (el === 'polish') el = 'polski';
                if (el === 'english') el = 'angielski';
                if (el === 'dutch') el = 'niemiecki';
                if (el === 'czech') el = 'czeski';
                return (
                    <div key={keyId++} className={'language-container'}>
                        <img alt={''} src={require('../svg/icons/ok.svg')}/>
                        <div className={'language-info'}> {el} </div>
                    </div>
                )
            },
        );
    }

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <CourtSingleHead {...props.page}/>
            </MainHeaderSection>
            {field_service_languages &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}> OBSŁUGA W JĘZYKU</div>
                </div>
                <h2>{nameOfLanguage}</h2>
            </div>
            }
            {props.page.body &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
                </div>
                <h2 className={'description-main'}>{parserShortcodes(props.page.body)}</h2>
            </div>
            }


                {props.page.video.length !== 0 && <Video video={props.page.video.embed}/>}
                {props.page.attachments.length!==0 &&<Attachment attachments={props.page.attachments}/>}


            {props.page.gallery && <Gallery items={galleryBoard}/>}

            <OneCarouseInRow className={'news-loop'} carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualności',
                ItemComponent: LoopCard,
                items: news || [],
            }}/>

            {!!coords?.length &&
            <div className="single-attraction-map"><GoogleMap className={'map'} markers={coords}/></div>}
        </>
    );
};