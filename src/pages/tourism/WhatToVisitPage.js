import React from 'react';
import { API, MOCK_API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import PicturesSlider from "../../components/slider/PicturesSlider";
import { sample_slides } from "../../mock/slides_example";
import LoopSearchForm from "../../components/loop/LoopSearchForm";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import Loader from "../../components/general/Loader";
import LoopAttractionPost from "../../components/attractions/LoopAttractionPost";
import LoopPathPost from "../../components/paths/LoopPathPost";
import DiscountsContainer from "../../components/discounts/DiscountsContainer";
import YellowDiscountBlock from "../../components/discounts/YellowDiscountBlock";
import TextLinkPic from "../../components/general/TextLinkPic";
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";

const text_link_pic = {
    heading: "Gra Terenowa",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "#",
    link_label: "dowiedz się więcej",
    picture: "/img/pics/1.jpg"
};

export default function () {
    const [slides, setSlides] = React.useState([]);
    const [attractions, setAttractions] = React.useState(null);
    const [paths, setPaths] = React.useState(null);
    const [discounts, setDiscounts] = React.useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            setSlides(sample_slides);
            MOCK_API.get("attractions.json").then(res => setAttractions(res.data));
            MOCK_API.get("paths.json").then(res => setPaths(res.data));
            MOCK_API.get("discounts.json").then(res => setDiscounts(res.data));
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

            <DiscountsContainer
                heading={<>Aktualne promocje <br/>i karty rabatowe</>}
                headingLink={window.location.href}
                headingLinkText={'ZOBACZ WSZYSTKIE'}
            >
                {discounts !== null && !discounts.length && <h3>Brak</h3>}
                {!!discounts?.length && discounts?.map((item, index) => <YellowDiscountBlock key={index} {...item} />)}
                {!discounts && <Loader style={{ width: '100%' }} />}
            </DiscountsContainer>

            <TextLinkPic { ...text_link_pic } />

            <MapWithPinsFiltering type="attractions" />
        </>
    );
}
