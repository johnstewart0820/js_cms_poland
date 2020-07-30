import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from "./SectionHeading";

import "../../styles/general/links-tiles.scss";

const LinksTiles = ({ heading, links }) => (
	links && links.length
	? (
		<section className="links-tiles">
			<div className="container">
				<SectionHeading heading={ heading } />

				<div className="row">

					{ links && links.length > 0 &&
						links.map(({ href, label }, index) => (
							<a key={ index } href={ href } target="_blank" > { label } </a>
						))
					}

				</div>
			</div>		
		</section>
	) : null
	
)

LinksTiles.propTypes = { 
	heading: PropTypes.string,
	links: PropTypes.array.isRequired
}

export default LinksTiles;