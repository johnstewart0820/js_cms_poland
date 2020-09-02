import React from 'react';
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PicturesSlider from "../../components/slider/PicturesSlider";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import LoopSearchForm from "../../components/loop/LoopSearchForm";
import {sample_slides} from "../../mock/slides_example";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import LoopAttractionPost from "../../components/attractions/LoopAttractionPost";
import {MOCK_API} from "../../extra/API";
import Loader from "../../components/general/Loader";

const AttractionPage = () => {
    const [slides, setSlides] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getAttractions()
        setSlides(sample_slides);
    },[])

    const getAttractions = () => {
        setLoading(false);
        MOCK_API.get('attractions.json')
            .then((res) => setData(res.data))
    }

    return (
        <>
            <MainHeaderSection extra_classes="subpage">

                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Noclegi" }]} />
                <PicturesSlider slides={ slides } />

            </MainHeaderSection>

            <LoopSearchForm
                type="what-to-visit"
                heading="FILTR KATEGORII"
            />

            <LoopSearchPostsContainer
                heading={'ATRAKCJE'}
            >
                {loading && <Loader style={{ width: "100%" }}/>}
                {data.length > 0 && data.map((item, index) => (
                    <LoopAttractionPost key={index} {...item}/>
                ))}
            </LoopSearchPostsContainer>
        </>
    )
}

export default AttractionPage;