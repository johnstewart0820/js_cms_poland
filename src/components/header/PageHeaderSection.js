import React from 'react';
import "../../styles/header/page-header-section.scss";
import DefaultImage from "../../constants/DefaultImage";

const PageHeaderSection = ({extra_classes, thumbnail, children, noDefaultImage}) => (
    <div className={`page-header-section ${extra_classes || ""}`}>
        <div className="page-header-section__main">
            {children}
        </div>
        {(thumbnail || (!thumbnail && !noDefaultImage)) && (
            <div
                className="page-header-section__thumbnail thumbnail"
                style={{backgroundImage: `url("${thumbnail || DefaultImage}")`}}
            />
        )}
    </div>
);

export default PageHeaderSection;