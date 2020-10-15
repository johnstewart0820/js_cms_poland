import React from 'react';
import PropTypes from 'prop-types';

import {isFunction} from "../../extra/functions";
import Angle from "../../svg/components/Angle";

import "../../styles/buttons/arrows.scss";

const arrowClick = ( e, action, callback ) => {
	e.preventDefault();
	if ( isFunction( callback )) callback( action );
}

const Arrows = ({extra_classes, onClick, disabled}) => (
    <div className={`arrows ${extra_classes || ""}`}>
        {
            ["prev", "next"].map(action => (
                <button key={action} onClick={e => arrowClick(e, action, onClick)} disabled={disabled}>
                    <Angle direction={action === "prev" ? "left" : ""}/>
                    <span className="d-none"> arrow </span>
                </button>
            ))
        }
    </div>
)

Arrows.propTypes = {
	extra_classes: PropTypes.string,
	onClick: PropTypes.func
}

export default Arrows;