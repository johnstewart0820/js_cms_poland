import React from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../../extra/functions';
import { CloseIcon } from "../../svg/icons";

import "../../styles/buttons/close-button.scss";

const CloseButton = ({ onClick }) => (
	isFunction( onClick )
	? (
		<button className="close-button" onClick={onClick}>
			<span className="d-none"> close button </span>
			<CloseIcon />
		</button>
	)
	: null
	
)

CloseButton.propTypes = { onClick: PropTypes.func.isRequired }

export default CloseButton;