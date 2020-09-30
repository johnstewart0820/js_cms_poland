import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import LoopNewsPost from "../components/news/LoopNewsPost";
import {API} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import GastronomySingleHead from "../components/gastronomy/GastronomySingleHead";
import '../styles/gastronomy/gastronomy-single-page.scss'
import GoogleMap from "../components/map/GoogleMap";
import Footer from "../components/footer/Footer";

export default function GastronomySingle(props) {
    const pageId = props.page.id;
    let keyId = 0;

    const {categories, body} = props.page;
    const {field_map_gps, field_service_languages, field_additional_description_history, field_prices_variant, field_is_free_entrance, field_facilities_restaurants} = props.page.acf;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [gallery, setGallery] = React.useState(props.page.gallery);
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
        gallery.forEach(element => {
            gallery.push({
                description: element.description,
                name: "",
                title: element.title,
                url: element.name,
            });
        });
        setLoading(false);
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
                if (el === 'garden') el = 'ogródek';
                if (el === 'live-music') el = 'muzyka na żywo';
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
                <Breadcrumbs breadcrumbs={[]}/>
                <GastronomySingleHead {...props.page}/>
            </MainHeaderSection>
            {(!field_is_free_entrance && field_prices_variant) &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>CENNIK</div>
                </div>
                <button className="button-planer button-link green ">ZOBACZ MENU</button>
            </div>
            }
            {field_service_languages &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OBSŁUGA W JĘZYKU</div>
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
                <h2 className={' description-main'}>{Parser(body)}</h2>
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

            {gallery && <Gallery items={gallery}/>}

            {field_additional_description_history &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>HISTORIA</div>
                </div>
                <h2 className={' description-main'}>{Parser(field_additional_description_history)}</h2>
            </div>
            }

            <OneCarouseInRow className={'news-loop'} carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualności',
                ItemComponent: LoopNewsPost,
                items: news || [],
            }}/>

            {coords && <GoogleMap className={'map'} markers={coords}/>}

            <Footer/>
        </>
    );
};