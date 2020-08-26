import React from 'react';
import PropTypes from "prop-types";

import { TileMark } from '../../svg/icons';
import "../../styles/header/main-header-external-link.scss";

const MainHeaderExternalLink = ({ heading, href = "#" }) => (
	<a href={ href } target="_blank" rel={'noopener noreferrer'} className="main-header-external-link has-overlay">
		<TileMark />
		<div className="heading"> { heading }  </div>
		<span/> 
	</a>
)

MainHeaderExternalLink.propTypes = {
	heading: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired
}

export default MainHeaderExternalLink;