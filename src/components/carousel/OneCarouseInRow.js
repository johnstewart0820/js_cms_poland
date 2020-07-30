import React from 'react';
import PropTypes from 'prop-types';

import Carousel from "./Carousel";
import Loader from "../general/Loader";

import "../../styles/carousel/one-carousel-in-row.scss";

const OneCarouseInRow = ({ loading, carousel }) => (
	<section className="one-carousel-in-row">
		{ loading && <Loader /> }
		
		<div>
			{ !loading && <Carousel { ...carousel } /> }
		</div>
	</section>
)

OneCarouseInRow.propTypes = {
	loading: PropTypes.bool,
	carousel: PropTypes.object.isRequired
}

export default OneCarouseInRow;