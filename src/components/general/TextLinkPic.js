import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from "./SectionHeading";
import "../../styles/buttons/button-link.scss";
import "../../styles/general/text-link-pic.scss";

const TextLinkPic = ({ heading, text, link, link_label, picture }) => (
	<section className="text-link-pic">
		<div className="container">
			<div className="row">
				<SectionHeading heading={ heading } />

				<div className="text-link-pic__text">
					<p> { text } </p>

					{ link && link_label && 
						<a href={ link } target="_blank" className="button-link green-transparent"> { link_label } </a>
					}
				</div>

				{ picture && 
					<div className="text-link-pic__picture">
						<div className="thumbnail" style={{ backgroundImage: `url(${ picture })` }} />
					</div>
				}

			</div>
		</div>
	</section>
)

TextLinkPic.propTypes = { 
	heading: PropTypes.string,
	text: PropTypes.string,
	link: PropTypes.string,
	link_label: PropTypes.string,
	picture: PropTypes.string
}

export default TextLinkPic;