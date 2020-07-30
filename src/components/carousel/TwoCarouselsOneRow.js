import React from 'react';
import PropTypes from 'prop-types';

import Carousel from "./Carousel";
import Loader from "../general/Loader";

import "../../styles/carousel/two-carousels-one-row.scss";

const loader_style = { minHeight: "600px" };

const CarouselItem = ({ loading, items, heading, path_to_all, component }) => (
	<div>
		{ loading && <Loader style={ loader_style } /> }

		{ !loading && items && !!items.length &&  
			<Carousel
				heading={ heading }
				path_to_all={ path_to_all }
				items={ items }
				ItemComponent={ component }
			/>
		}
	</div>
)

const TwoCarouselsOneRow = ({ first_carousel, second_carousel }) => (
	( first_carousel && second_carousel )
	? (
		<section className="two-carousels-one-row">
			
			<CarouselItem { ...first_carousel } />
			<CarouselItem { ...second_carousel } />

		</section>
	) : null
)

TwoCarouselsOneRow.propTypes = {
	first_carousel: PropTypes.exact({
		loading: PropTypes.bool,
		heading: PropTypes.string,
		path_to_all: PropTypes.string,
		link_to_all: PropTypes.string,
		items: PropTypes.array.isRequired,
		component: PropTypes.elementType
	}),

	second_carousel: PropTypes.exact({
		loading: PropTypes.bool,
		heading: PropTypes.string,
		path_to_all: PropTypes.string,
		link_to_all: PropTypes.string,
		items: PropTypes.array.isRequired,
		component: PropTypes.elementType
	}),
}

export default TwoCarouselsOneRow;