import React from "react";
import PropTypes from "prop-types";
import PicturesSlider from "../components/slider/PicturesSlider";
import PageHeaderSection from "../components/header/PageHeaderSection";
import SiteInfoContext from "../constants/SiteInfoContext";

const getSlides = (page, defaultContent) => {
    const shouldOverride = page.acf.field_should_override_slider;
    const overrideSlides = page.acf.field_override_slides;

    if (shouldOverride && overrideSlides?.length)
        return overrideSlides;

    return defaultContent.acf.field_override_slides;
};

const PageHeaderOrSlider = props => {
    const slides = getSlides(props.page, React.useContext(SiteInfoContext).site_info.default_content);

    if (slides?.length)
        return <PicturesSlider style={{minHeight: "calc( 740px - 90px)"}} slides={slides} />;

    return (
        <PageHeaderSection>
            <div className="container">
                <div className="page-title">{props.page.title}</div>
            </div>
        </PageHeaderSection>
    );
};

PageHeaderOrSlider.propTypes = {
    page: PropTypes.object.isRequired,
};

export default PageHeaderOrSlider;
