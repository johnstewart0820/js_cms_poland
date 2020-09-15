import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { API } from "../../extra/API";


import GoogleMap from "./GoogleMap";
import Loader from "../general/Loader";
import LinkToAll from "../buttons/LinkToAll";
import "../../styles/map/map-with-pins-filtering.scss";

let all_markers = [];

export default function MapWithPinsFiltering ( props ) {
	
	const [ loading, setLoading ] = useState( true );
	
	const [ filter_by, setFilterBy ] = useState("*");
	const [ filters, setFilters ] = useState( [] );
	const [ markers, setMarkers ] = useState( [] );

	const [ info, setInfo] = useState( {} );

	useState(() => {

		const { map_id } = props;
		if ( !map_id ) return;
	
		API.get(`maps/${ map_id }`)
		.then( res => {
			
			const { map } = res.data;
			const { name, points, categories } = map;
	
			all_markers = [...points ];

			setFilters( getFilters( Object.values( categories )));
			setMarkers( getMarkers());
			setInfo({ heading: name });
			setLoading( false );
	
		})
		.catch( err => { });

	}, [ ]);


	useState(() => setMarkers( getMarkers()), [ filter_by ]);


	function getFilters ( categories ) {
		return categories && !!categories.length
			? categories.map( item => {

				const { id, name, legend_image } = item;
				return { value: name === "Wszystkie" ? "*" : id, label: name, icon: legend_image }
			})
			: []
	}


	function getMarkers () {
		return all_markers && !!all_markers.length
				? all_markers.filter( item => ( item.category === filter_by || filter_by === "*" ))
					.map( item => {
						const { lat, lng, category, map_image } = item;
						return { lat, lng, category, icon: { url: map_image, width: 46, height: 57 }};
					})	
				: null;
	}


	return (
			<div className={`map-with-pins-filtering ${ props.extra_classes || "" }`}>

				{ loading && <Loader/> }

				<div className="map-with-pins-filtering-info">

					{ loading && <Loader extra_classes="white"/>}

					{ !loading && 
					(
						<>
							<div className="map-with-pins-filtering-info__main">
								<div className="heading"> { info?.heading } </div>
								<div className="map-with-pins-filtering-info__text"> { info?.text } </div>

								{ props.link_to_all && <LinkToAll path={ props.link_to_all } label="Dowiedz się więcej"/> }
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
					)}

				</div>

			{ !loading && markers && !!markers.length && <GoogleMap markers={ markers }/> }
		</div>
	)
}

MapWithPinsFiltering.propTypes = {
	map_id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,

	extra_classes: PropTypes.string,
	link_to_all: PropTypes.string,
}
