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

export default function NewsSinglePage(props) {
    const [news, setNews] = React.useState(null);

    React.useEffect(() => {
        API.getEntities({categories: props.page.categories})
            .then(res => setNews(res.data.contents))
            .catch(e => {
                console.error(e);
                setNews(false);
            });
    }, []);

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <NewsSingleHead {...props.page}/>
            </MainHeaderSection>

            {props.page.body && (
                <SingleContainer extra_classes="single-news-container">
                    <div>{Parser(props.page.body)}</div>
                    <SingleContentBottom/>
                </SingleContainer>
            )}

            {!!props.page.gallery?.length && <Gallery items={props.page.gallery}/>}

            {news !== false && (
                <OneCarouseInRow carousel={{
                    loading: news === null,
                    heading: 'Ostatnie aktualności',
                    ItemComponent: LoopNewsPost,
                    items: news || [],
                }} />
            )}
        </>
    );
};