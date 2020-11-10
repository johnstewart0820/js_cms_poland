import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from "./SectionHeading";
import "../../styles/buttons/button-link.scss";
import "../../styles/general/text-link-pic.scss";
import {Link} from "react-router-dom";
import Parser from "html-react-parser";

const TextLinkPic = ({heading, text, link, link_label, picture}) => (
    <section className="text-link-pic">
        <div className="container">
            <div className="row">
                <SectionHeading heading={heading}/>

                <div className="text-link-pic__text">
                    <p>{Parser(text)}</p>

                    {link && link_label && (
                        <Link to={link} className="button-link green-transparent">
                            {link_label}
                        </Link>
                    )}
                </div>

                {picture && (
                    <div className="text-link-pic__picture">
                        <div className="thumbnail" style={{backgroundImage: `url("${picture}")`}}/>
                    </div>
                )}
            </div>
        </div>
    </section>
);

TextLinkPic.propTypes = {
    heading: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    link_label: PropTypes.string,
    picture: PropTypes.string,
};

export default TextLinkPic;
