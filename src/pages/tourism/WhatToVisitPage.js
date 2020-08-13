import React from 'react';
import {API} from "../../extra/API";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import PicturesSlider from "../../components/slider/PicturesSlider";
import { sample_slides } from "../../mock/slides_example";
import LoopSearchForm from "../../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import Loader from "../../components/general/Loader";
import LoopAttractionPost from "../../components/attractions/LoopAttractionPost";
import LoopPathPost from "../../components/paths/LoopPathPost";

export default function () {
    const [slides, setSlides] = React.useState([]);
    const [attractions, setAttractions] = React.useState(null);
    const [paths, setPaths] = React.useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            setSlides(sample_slides);
            API.get("mock/attractions.json").then(res => setAttractions(res.data));
            API.get("mock/paths.json").then(res => setPaths(res.data));
        }, 500);
    }, []);

    return (
        <>
            <MainHeaderSection extra_classes={'subpage'}>
                <Breadcrumbs breadcrumbs={[{label: 'Visit.ustron.pl'}, {label: 'Co zwiedzić'}]} />
                <PicturesSlider slides={slides} />
            </MainHeaderSection>

            <LoopSearchForm
                heading={'WYSZUKIWARKA ATRAKCJI'}
                type={'what-to-visit'}
                submitCallback={() => {}}
            />

            <LoopSearchPostsContainer extra_classes={'gastronomy'} heading={'Atrakcje'} headingLink={window.location.href} headingLinkText={'ZOBACZ WSZYSTKIE'}>
                {attractions !== null && !attractions.length && <h3>Brak</h3>}
                {!!attractions?.length && attractions?.map((item, index) => <LoopAttractionPost key={index} {...item} />)}
                {!attractions && <Loader style={{width: '100%'}} />}
            </LoopSearchPostsContainer>

            <LoopSearchPostsContainer extra_classes={'gastronomy'} heading={'Szlaki'} headingLink={window.location.href} headingLinkText={'ZOBACZ WSZYSTKIE'}>
                {paths !== null && !paths.length && <h3>Brak</h3>}
                {!!paths?.length && paths?.map((item, index) => <LoopPathPost key={index} {...item} />)}
                {!paths && <Loader style={{ width: '100%' }} />}
            </LoopSearchPostsContainer>
        </>
    );
}
