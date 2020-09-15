import React from 'react';
import Parser from "html-react-parser";
import MainHeaderSection from "../components/header/MainHeaderSection";
import OneCarouseInRow from "../components/carousel/OneCarouseInRow";
import Gallery from "../components/gallery/Gallery";
import Loader from "../components/general/Loader";
import Breadcrumbs from "../components/general/Breadcrumbs";
import NewsSingleHead from "../components/news/NewsSingleHead";
import LoopNewsPost from "../components/news/LoopNewsPost";
import SingleContainer from "../components/common-single/SingleContainer";
import SingleContentBottom from "../components/common-single/SingleContentBottom";

export default function NewsSinglePage(props) {
    const acf = props.page.acf;

    return (
        <>
            <MainHeaderSection extra_classes="single">
                <Breadcrumbs breadcrumbs={[]}/>
                <NewsSingleHead/>
            </MainHeaderSection>

            {/*{!loading && content && (
                <>
                    <SingleContainer title={title}>
                        <div> {Parser(content)} </div>

                        <SingleContentBottom/>
                    </SingleContainer>

                    {gallery && !!gallery.length && <Gallery items={gallery}/>}
                </>
            )}*/}

            <OneCarouseInRow/>
        </>
    )
};