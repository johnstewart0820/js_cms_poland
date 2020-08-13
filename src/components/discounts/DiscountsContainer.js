import React from 'react';
import PropTypes from "prop-types";
import SectionHeading from "../general/SectionHeading";
import "../../styles/discounts/discount-container.scss";

const karta = require('../../img/uzdrowisowa-karta.png');

const DiscountsContainer = props => (
    <section className={props.extraClasses || ''}>
        <div className="container">
            <SectionHeading
                heading={props.heading}
                headingLink={props.headingLink}
                headingLinkText={props.headingLinkText}
            />

            <div className="d-flex justify-content-between">
                <div className="discount__karta">
                    <span>DOWIEDZ SIĘ CO MOŻESZ ZYSKAĆ</span>
                    <img src={karta} alt={'uzdrowisowa karta'} />
                </div>
                <div className="discount__items">
                    {props.children}
                </div>
            </div>
        </div>
    </section>
);

DiscountsContainer.propTypes = {
    extraClasses: PropTypes.string,
    heading: PropTypes.node,
    headingLink: PropTypes.string,
    headingLinkText: PropTypes.node,
};

export default DiscountsContainer;
