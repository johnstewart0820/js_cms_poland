import React from 'react';
import PropTypes from 'prop-types';
import { TileMark } from "../../svg/icons";
import "../../styles/general/section-heading.scss";

const SectionHeading = ({ heading, extra_classes }) => (
	heading 
	? (
		<div className={`section-heading ${ extra_classes || "" }`}>
			<TileMark />
			<div className="heading"> { heading } </div>
		</div>
	)
	: null
)

SectionHeading.propTypes = {
	heading: PropTypes.string.isRequired,
	extra_classes: PropTypes.string,
}

export default SectionHeading;