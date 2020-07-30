import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from "./SectionHeading";

import "../../styles/general/pics-text-link.scss";
import "../../styles/buttons/button-link.scss";

const PicsTextLink = ({ heading, pics, text, link, link_label }) => (
	<section className="pics-text-link">
		<div className="container">

			<SectionHeading heading={ heading } />

			<div className="row">

				{ pics && pics.length > 0 &&
					<div className="pics-text-link__pics">
						{ pics.map(({ url, label }, index) => (
							<div 
								key={ index }
								className="thumbnail has-overlay"
								style={{ backgroundImage: `url(${ url })` }}	
							>
								{ label }
							</div>
						)) }
					</div>
				}

				<div className="pics-text-link__text">
					{ text && <p> { text } </p> }
					{ link && <a href={ link } target="_blank" className="button-link green-transparent"> { link_label } </a> }
				</div>
			
			</div>

		</div>
	</section>
)

PicsTextLink.propTypes = { 
	heading: PropTypes.string,
	pics: PropTypes.array,
	text: PropTypes.string,
	link: PropTypes.string,
	link_label: PropTypes.string
}

export default PicsTextLink;