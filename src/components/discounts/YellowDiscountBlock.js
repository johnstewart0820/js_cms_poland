import React from "react";
import PropTypes from "prop-types";
import "../../styles/discounts/yellow-discount.scss";

const YellowDiscountBlock = props => (
    <div className="mx-2">
        <div className="yellow-discount__amount">
            {props.amount}%
        </div>
        <div className="yellow-discount__content">
            <span className="yellow-discount__title">{props.title}</span>
            <span>{props.description}</span>
        </div>
    </div>
);

YellowDiscountBlock.propTypes = {
    amount: PropTypes.number,
    title: PropTypes.node,
    description: PropTypes.node,
};

export default YellowDiscountBlock;
