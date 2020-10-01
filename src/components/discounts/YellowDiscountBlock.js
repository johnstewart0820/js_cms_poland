import React from "react";
import PropTypes from "prop-types";
import "../../styles/discounts/yellow-discount.scss";
import Parser from "html-react-parser";
import DefaultImage from "../../constants/DefaultImage";

const YellowDiscountBlock = props => (
    <div className="mx-2 yellow-discount">
        <img className="yellow-discount__amount" src={props.field_discount_image || DefaultImage} alt=""/>
        <div className="yellow-discount__content">
            <span className="yellow-discount__title">{props.field_discount_title}</span>
            <span>{Parser(props.field_discount_description)}</span>
        </div>
    </div>
);

YellowDiscountBlock.propTypes = {
    amount: PropTypes.number,
    title: PropTypes.node,
    description: PropTypes.node,
};

export default YellowDiscountBlock;
