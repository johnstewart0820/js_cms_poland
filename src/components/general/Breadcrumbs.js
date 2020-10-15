import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/general/breadcrumbs.scss";
import {main_url} from "../../extra/main_menu";
import SelectiveLink from "../../extra/SelectiveLink";

const start_link = {label: "Start", href: main_url};

const Breadcrumbs = ({breadcrumbs, extra_classes, withStart}) => {
    const crumbs = (withStart ? [start_link, ...breadcrumbs] : breadcrumbs).map(crumb => ({
        label: crumb.label || crumb.title || crumb.name,
        link: crumb.href || crumb.to || crumb.url,
    }));

    return (
        <div className={`breadcrumbs ${extra_classes}`}>
            <div className="container">
                <div className="breadcrumbs__items">
                    {crumbs && !!crumbs.length && crumbs.map(({label, link}, index) => (
                        link
                            ? <SelectiveLink key={index} to={link}>{label}</SelectiveLink>
                            : <div key={index}>{label}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    extra_classes: PropTypes.string,
    withStart: PropTypes.any,
};

export default Breadcrumbs;
