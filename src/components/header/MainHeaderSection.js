import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/header/main-header-section.scss";

const MainHeaderSection = ({ children, extra_classes }) => (
	<div id="main-header-section" className={`main-header-section ${ extra_classes || "" }`}>
		<div className="main-header-section__main">
			
			{ children }
			
		</div>
	</div>
)

MainHeaderSection.propTypes = { 
	extra_classes: PropTypes.string
}

export default MainHeaderSection;