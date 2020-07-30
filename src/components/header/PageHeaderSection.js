import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/header/page-header-section.scss";

const PageHeaderSection = ({ extra_classes, thumbnail, children }) => (
	<div className={`page-header-section ${ extra_classes || "" }`}>

		<div className="page-header-section__main">
			{ children }
		</div>	

		{ thumbnail && 
			<div className="page-header-section__thumbnail thumbnail" style={{ backgroundImage: `url(${ thumbnail })` }} />
		}
	</div>
)

PageHeaderSection.propTypes = { }

export default PageHeaderSection;