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

const pageId = 100;

export default function AttractionSingle(props) {

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);

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

    if (!!loading)
        return <Loader/>


    let a = props.page.gallery.map(r => {
        r.url = r.name
    })

    console.log(a);


    let k = props.page.acf.field_service_languages.map(r => <div><img alt={''}
                                                                      src={require('../svg/icons/logo-black.svg')}/>{r}
    </div>)

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <AttractionSingleHead {...props.page}/>
            </MainHeaderSection>
            {/*<SingleContainer extra_classes="single-news-container">*/}
            {/*    /!*<div>{Parser(props.page.acf.field_description)}</div>*!/*/}
            {/*    /!*<SingleContentBottom/>*!/*/}
            {/*</SingleContainer>*/}

            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <h3>OBSŁUGA W JĘZYKU</h3>
                </div>
                <h2>{k}</h2>
            </div>


            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <h3>OPdIS</h3>
                </div>
                <h2 className={'description'}>{Parser(props.page.acf.field_description)}</h2>
            </div>


            <Gallery items={a}/>


            <OneCarouseInRow carousel={{
                loading: news === null,
                heading: 'Ostatnie aktualności',
                ItemComponent: LoopNewsPost,
                items: news || [],
            }}/>

            <GoogleMap markers={[]}/>
        </>
    );
};