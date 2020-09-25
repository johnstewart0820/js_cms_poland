import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import NewsSingleHead from "../components/news/NewsSingleHead";
import LoopNewsPost from "../components/news/LoopNewsPost";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";
import {API} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import AttractionSingleHead from "../components/attractions/AttractionSingleHead";
import {Container} from "../components/UserPanel/Container";
import '../styles/attractions/AttractionSinglePage.scss'
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import GoogleMap from "../components/map/GoogleMap";


export default function AttractionSingle(props) {
    const pageId = props.page.id;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [gallery, setGallery] = React.useState(props.page.gallery);
    const newArrayItems = [];

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories})
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
                setLoading(false);
            })
    }, []);


    React.useEffect(() => {
        gallery.forEach((element => {
            newArrayItems.push({
               description: element.description,
               name: element.url,
               title: element.title,
               url: element.name
            });
        }));
    }, [gallery]);


    if (!!loading)
        return <Loader/>



    function transplatePrice (priceInEnglisz){
        if(priceInEnglisz === 'low-prices') return  'niskie';
        else if(priceInEnglisz === 'medium-prices') return  'umiarkowane';
        else if(priceInEnglisz === 'high-prices') return  'wysokie';
    }


    let coords = [];
    const gps = props.page.acf.field_map_gps.split(';');
    coords.push({
        lat: gps[0],
        lng: gps[1]
    });


    let nameOfLanguage = props.page.acf.field_service_languages.map(el =>{
        if(el === 'polish')  el = 'polski' ;
        if(el === 'english')  el = 'angielski' ;
        if(el === 'dutch')  el = 'niemiecki' ;
        if(el === 'czech')  el = 'czeski' ;
        return(
            <div className={'language-container'}>
                <img alt={''} src={require('../svg/icons/ok.svg')}/>
                <div className={'language-info'}>{el}</div>
            </div>)});

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <AttractionSingleHead {...props.page}/>
            </MainHeaderSection>

            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OBSŁUGA W JĘZYKU</div>
                </div>
                <h2 className={''}>{nameOfLanguage}</h2>
            </div>


            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
            </div>
            <h2 className={' description-main'}>{Parser(props.page.acf.field_description)}</h2>
            </div>


            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>Ceny</div>
                </div>
                <h2 className={' description-main'}>{transplatePrice(props.page.acf.field_prices_variant)}</h2>
            </div>

            {newArrayItems}
            <Gallery items={newArrayItems}/>

            <OneCarouseInRow carousel={{
                loading: news === null,
                heading: 'Ostatnie aktgualności',
                ItemComponent: LoopNewsPost,
                items: news || [],
            }}/>

            <GoogleMap markers={coords}/>
        </>
    );
};