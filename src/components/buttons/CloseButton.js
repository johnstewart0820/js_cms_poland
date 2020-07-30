import React from 'react';
import PropTypes from 'prop-types';

import { isFunction } from '../../extra/functions';
import { CloseIcon } from "../../svg/icons";

import "../../styles/buttons/close-button.scss";

const CloseButton = ({ onClick }) => (
	isFunction( onClick )
	? (
		<a href="#" className="close-button" onClick={ e => { e.preventDefault(); onClick() }}>
			<span className="d-none"> close button </span>
			<CloseIcon />
		</a>
	)
	: null
	
)

CloseButton.propTypes = { onClick: PropTypes.func.isRequired }

export default CloseButton;