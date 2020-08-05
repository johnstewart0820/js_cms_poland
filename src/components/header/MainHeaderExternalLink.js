import React from 'react';
import { TileMark } from '../../svg/icons';

import "../../styles/header/main-header-external-link.scss";

const MainHeaderExternalLink = ({ href = "#" }) => (
	<a href={ href } target="_blank" rel={'noopener noreferrer'} className="main-header-external-link has-overlay">
		<TileMark />
		<div className="heading"> Bądź na bieżąco </div>
		<span/> 
	</a>
)

MainHeaderExternalLink.propTypes = { }

export default MainHeaderExternalLink;