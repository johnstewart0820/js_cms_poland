import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../general/Loader';
import LinkToAll from "../buttons/LinkToAll";

const MapFilters = ({ loading, info, link_to_all, filters, filter_by, setFilterBy }) => (
	<div className="map-with-pins-filtering-info">
		{ loading && <Loader extra_classes="white"/>}

		{ !loading && 
			<>
				<div className="map-with-pins-filtering-info__main">
					<div className="heading"> { info?.heading } </div>
					<div className="map-with-pins-filtering-info__text"> { info?.description } </div>

					{ link_to_all && <LinkToAll path={ link_to_all } label="Dowiedz się więcej"/> }
				</div>

				<div className="map-with-pins-filtering-filters">
					{ filters && !!filters.length &&
						filters.map(({ icon, label, extra_label, value }) => {

							const active_class = value === filter_by ? "active" : "";

							return (
								<button
									key={ value }
									className={`map-with-pins-filtering-filters__item ${ active_class } `}
									onClick={ e => {
										e.preventDefault();
										setFilterBy( value );
									}}
								>
									{ icon && <img src={ icon } alt="cat_image" /> }

									<span> { label } <small> { extra_label }</small> </span>
								</button>
							)

						})
					}
				</div>
			</>
		}
	</div>
)

MapFilters.propTypes = {
	loading: PropTypes.bool.isRequired, 
	info: PropTypes.object,
	link_to_all: PropTypes.string,
	filters: PropTypes.array.isRequired, 
	filter_by: PropTypes.string, 
	setFilterBy: PropTypes.func
}

export default MapFilters;