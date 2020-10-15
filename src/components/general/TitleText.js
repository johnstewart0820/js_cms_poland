import React from 'react';
import PropTypes from 'prop-types';
import SectionHeading from "./SectionHeading";
import "../../styles/buttons/button-link.scss";
import "../../styles/general/text-link-pic.scss";
import {Link} from "react-router-dom";

const TitleText = ({heading, text, link, link_label, extra_classes}) => (
    <section className={`text-link-pic ${extra_classes}`}>
        <div className="container">
            <div className="row">
                <SectionHeading heading={heading}/>
                <div className="text-link-pic__text full-width">
                    <p>{text}</p>
                    {link && link_label && (
                        <Link to={link} className="button-link green-transparent">
                            {link_label}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </section>
);

TitleText.propTypes = {
    heading: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    link_label: PropTypes.string,
};

export default TitleText;
