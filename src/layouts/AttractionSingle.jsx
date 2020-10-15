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
import AttractionSingleHead from "../components/attractions/AttractionSingleHead";
import '../styles/attractions/attraction-single-page.scss'
import GoogleMap from "../components/map/GoogleMap";

export default function AttractionSingle(props) {
    const pageId = props.page.id;
    let keyId = 0;

    const categories = props.page.categories;
    const {field_map_gps, field_service_languages, field_description, field_prices_variant, field_is_free_entrance} = props.page.acf;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [gallery, setGallery] = React.useState(props.page.gallery);
    const [worthSeeing, setWorthSeeing] = React.useState(props.page.acf.field_worth_seeing);
    const [ifTrail, setIfTrail] = React.useState(false);

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
        categories.forEach(element => {
            if (element.slug === "szlaki") setIfTrail(true);
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


    if (props.page.acf['field_map_gpstrack']) {
        var trails = JSON.parse(props.page.acf['field_map_gpstrack']);
        trails.forEach(
            element => {
                element.lat = parseFloat(element.lat);
                element.lng = parseFloat(element.lng);
            },
        )
    }

    if (!!loading)
        return <Loader/>

    function transplatePrice(priceInEnglisz) {
        if (priceInEnglisz === 'low-prices') return 'niskie';
        else if (priceInEnglisz === 'medium-prices') return 'umiarkowane';
        else if (priceInEnglisz === 'high-prices') return 'wysokie';
    }


    let coords = [];
    if (field_map_gps) {
        const [ lat, lng ] = field_map_gps.split(';');
        coords.push({ lat, lng });
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
                <Breadcrumbs breadcrumbs={[]}/>
                <AttractionSingleHead {...props.page}/>
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
            {field_description &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
                </div>
                <h2 className={' description-main'}>{Parser(field_description)}</h2>
            </div>
            }
            {(field_is_free_entrance && field_prices_variant) &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>CENY</div>
                </div>
                <h2 className={'description-main'}> {transplatePrice(field_prices_variant)} </h2>
            </div>
            }

            {ifTrail && (gallery || worthSeeing) ?
                <Gallery heading='warto zobaczyć na trasie' items={worthSeeing}/> :
                <Gallery items={gallery}/>}

            <OneCarouseInRow className={'news-loop'} carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualności',
                ItemComponent: LoopNewsPost,
                items: news || [],
            }}/>

            { !!coords?.length && <div className="single-attraction-map"><GoogleMap className={'map'} markers={coords}/></div> }
            { !!trails?.length && <div className="single-attraction-map"><GoogleMap className={'map'} trails={[trails]}/></div>}

        </>
    );
};