import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import Gallery from "../components/gallery/Gallery";
import Breadcrumbs from "../components/general/Breadcrumbs";
import {API} from "../extra/API";
import axios from "../extra/axios";
import Loader from "../components/general/Loader";
import '../styles/attractions/attraction-single-page.scss'

import PageHeaderSection from "../components/header/PageHeaderSection";

export default function DefaultSingle(props) {
    const pageId = props.page.id;

    const {body, categories, categories_labels, image, title} = props.page;

    const [date, setDate] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState(null);
    const [gallery, setGallery] = React.useState(props.page.gallery);


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


    if (!!loading)
        return <Loader/>


    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <PageHeaderSection extra_classes="single-attraction-head" thumbnail={image}>
                    <div className='single-attraction-main-info'>
                        <div className="category">{categories_labels}</div>
                        <div className="page-title">{title}</div>
                    </div>
                </PageHeaderSection>
            </MainHeaderSection>

            {body &&
            <div className="section-info">
                <div className={'section-title'}>
                    <img alt="" src={require('../svg/icons/logo-black.svg')}/>
                    <div className={'name-info'}>OPIS</div>
                </div>
                <h2 className={' description-main'}>{Parser(body)}</h2>
            </div>
            }

            {gallery && <Gallery items={gallery}/>}

        </>
    );
};