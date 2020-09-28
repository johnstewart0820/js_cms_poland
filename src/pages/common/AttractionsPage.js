import React from 'react';
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PicturesSlider from "../../components/slider/PicturesSlider";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import LoopSearchForm from "../../components/loop/LoopSearchForm";
import {sample_slides} from "../../mock/slides_example";
import LoopSearchPostsContainer from "../../components/loop/LoopSearchPostsContainer";
import LoopAttractionPost from "../../components/attractions/LoopAttractionPost";
import {API} from "../../extra/API";
import Loader from "../../components/general/Loader";
import PlanerButton from "../../components/buttons/PlanerButton";
import TourismRoutes from "../../constants/TourismRoutes";
import PlanerContext from "../../constants/PlanerContext";

const sort_options = [
    { value: 1, label: "Najbliższe aktualności" },
    { value: 2, label: "Najstarszy aktualności" },
];

const AttractionPage = () => {
    const [slides, setSlides] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const planerContext = React.useContext(PlanerContext);

    React.useEffect(() => {
        getAttractions()
        setSlides(sample_slides);
    },[])

    const getAttractions = () => {
        setLoading(false);
        API.getPosts(155)
            .then((res) => setData(res.data.contents))
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
                sort_options={sort_options}
            >
                {loading && <Loader style={{ width: "100%" }}/>}
                {data.length > 0 && data.map((item, index) => (
                    <LoopAttractionPost key={index} {...item} onClick={() => planerContext.add(item.id)}/>
                ))}
            </LoopSearchPostsContainer>
        </>
    )
}

export default AttractionPage;