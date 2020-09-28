import React from 'react';
import PropTypes from 'prop-types';
import { TileMark } from "../../svg/icons";
import "../../styles/general/section-heading.scss";
import LinkToAll from "../buttons/LinkToAll";

const SectionHeading = ({ heading, extra_classes, headingLink, headingLinkText }) => (
	heading 
	? (
		<div className={`section-heading ${ extra_classes || "" }`}>
			<TileMark />
			<div className="heading"> { heading } </div>

			{headingLink && headingLinkText && (
				<LinkToAll href={headingLink} label={headingLinkText} />
			)}
		</div>
	)
	: null
)

SectionHeading.propTypes = {
	heading: PropTypes.node,
	extra_classes: PropTypes.string,
	headingLink: PropTypes.string,
	headingLinkText: PropTypes.string,
}

export default SectionHeading;