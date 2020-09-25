
import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import LoopNewsPost from "../components/news/LoopNewsPost";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";
import {API} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import AttractionSingleHead from "../components/attractions/AttractionSingleHead";
import '../styles/attractions/AttractionSinglePage.scss'

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
    },[]);

    if (!!loading)
        return <Loader/>

