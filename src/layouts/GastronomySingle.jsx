import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import {API, API_URL} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import GastronomySingleHead from "../components/gastronomy/GastronomySingleHead";
import '../styles/gastronomy/gastronomy-single-page.scss'
import GoogleMap from "../components/map/GoogleMap";
import Modal from "../components/modal/Modal.js";
import LoopCard from "../components/loop/LoopCard";
import {parserShortcodes} from "../extra/functions";
import Video from "../components/general/Video";
import Attachment from "../components/general/Attachment";

export default function GastronomySingle(props) {
    const pageId = props.page.id;
    let keyId = 0;

    const {categories, body, video, gallery} = props.page;
    const {
        field_map_gps, field_service_languages, field_additional_description_pricelist,
        field_additional_description_history, field_prices_variant, field_is_free_entrance,
        field_facilities_restaurants,
    } = props.page.acf;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [galleryBoard, setGalleryBoard] = React.useState([]);
    const [worthSeeing, setWorthSeeing] = React.useState(props.page.acf.field_worth_seeing);
    const [show, setShow] = React.useState(false);


    React.useEffect(() => {
        API.getEntities({categories: categories})
            .then(res => setNews(res.data.contents))
            .catch(e => {
                console.error(e);
                setNews(false);
            });
    }, []);

    React.useEffect(() => {
        axios.get(`${API_URL}/contents/posts/${pageId}`)
            .then((res) => {
                setDate(res.data.content)
            })
    }, []);


    React.useEffect(() => {
        gallery.forEach(element => {
            galleryBoard.push({
                description: element.description,
                name: "",
                title: element.title,
                url: element.name,
            })
        });
        setLoading(false);
        setGalleryBoard(galleryBoard)
    }, [gallery]);

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

    if (field_facilities_restaurants) {
        var nameOfFacilities = field_facilities_restaurants.map(el => {
                if (el === 'garden') el = 'ogr??dek';
                if (el === 'live-music') el = 'muzyka na ??ywo';
                return (
                    <div key={keyId++} className={'language-container'}>
                        <img alt={''} src={require('../svg/icons/ok.svg')}/>
                        <div className={'language-info'}> {el} </div>
                    </div>
                )
            },
        );
    }


    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={props.page.breadcrumb}/>
                <GastronomySingleHead {...props.page}/>
            </MainHeaderSection>
            {(!field_is_free_entrance && field_additional_description_pricelist) &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>CENNIK</div>
                </div>
                <button onClick={() => setShow(true)} className="button-planer button-link green ">ZOBACZ MENU</button>
            </div>
            }
            {field_service_languages &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OBS??UGA W J??ZYKU</div>
                </div>
                <h2>{nameOfLanguage}</h2>
            </div>
            }
            {body &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
                </div>
                <h2 className={' description-main'}>{parserShortcodes(body)}</h2>
            </div>
            }
            {field_facilities_restaurants &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>UDOGODNIENIA</div>
                </div>
                <h2 className={'name-facilities'}>{nameOfFacilities}</h2>
            </div>
            }

            {video.length !== 0 && <Video video={video.embed}/>}
            {props.page.attachments.length !== 0 && <Attachment attachments={props.page.attachments}/>}

            {gallery && <Gallery items={galleryBoard}/>}


            {field_additional_description_history &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>HISTORIA</div>
                </div>
                <h2 className={'description-main'}>{Parser(field_additional_description_history)}</h2>
            </div>
            }

            <OneCarouseInRow className={'news-loop'} carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualno??ci',
                ItemComponent: LoopCard,
                items: news || [],
            }}/>

            {!!coords?.length &&
            <div className="single-attraction-map"><GoogleMap className={'map'} markers={coords}/></div>}
            <Modal show={show} handleClose={handleClose} children={Parser(field_additional_description_pricelist)}/>
        </>
    );
};