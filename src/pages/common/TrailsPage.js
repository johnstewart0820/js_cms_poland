import React from "react";
import Breadcrumbs from "../../components/general/Breadcrumbs";
import PicturesSlider from "../../components/slider/PicturesSlider";
import MainHeaderSection from "../../components/header/MainHeaderSection";
import {sample_slides} from "../../mock/slides_example";
import LoopSearchForm from "../../components/loop/LoopSearchForm";

const TrailsPage = () => {
    const [slides, setSlides] = React.useState([]);

    React.useEffect(() => {
        setSlides(sample_slides);
    },[])

    return(
        <>
            <MainHeaderSection extra_classes="subpage">
                <Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Noclegi" }]} />
                <PicturesSlider slides={ slides } />
            </MainHeaderSection>

            <LoopSearchForm
                type="what-to-visit"
                heading="FILTR KATEGORII"
            />
        </>
    )
}

export default TrailsPage;