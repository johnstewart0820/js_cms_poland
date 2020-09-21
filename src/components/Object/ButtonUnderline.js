import React from "react";
import '../../styles/ObjectPages/ButtonUnderline.scss';
import PropTypes from 'prop-types';

const ButtonUnderline = props => {
    return(
        <>
            <button
                onClick={props.onClick}
                className={`button-with-underline ${props.extraClasses}`}>
                {props.buttonText.toUpperCase()}
                <hr/>
            </button>
        </>
    )
}

ButtonUnderline.propTypes = {
    buttonText: PropTypes.string.isRequired,
}

export default ButtonUnderline;