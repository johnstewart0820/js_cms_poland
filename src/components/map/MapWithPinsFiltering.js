import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from "prop-types";
import { API } from "../../extra/API";

import MapFilters from './MapFilters';
import GoogleMap from "./GoogleMap";
import MapPopupInfo from "./MapPopupInfo";

import Loader from "../general/Loader";
import "../../styles/map/map-with-pins-filtering.scss";

let all_markers = [];

export default function MapWithPinsFiltering ( props ) {
	
	const [ loading, setLoading ] = useState( true );
	const [ view, setView ] = useState("filters");
	const [ popup_info, setPopupInfo ] = useState( {} );
	
	const [ filter_by, setFilterBy ] = useState( null );
	const [ filters, setFilters ] = useState( [] );
	const [ info, setInfo ] = useState( {} );

	const markers = useMemo (() => (
		all_markers && !!all_markers.length
			? all_markers.filter( item => ( item.category === filter_by || filter_by === "*" ))
				.map(({ id, lat, lng, category, map_image }) => (
					{ id, lat, lng, category, icon: { url: map_image, width: 46, height: 57 }}
				))	
			: null
	), [ filter_by ]);


	useEffect(() => {

		const { map_id } = props;
		if ( !map_id ) return;

		setLoading( true );
	
		API.get(`maps/${ map_id }`)
		.then( res => {
			
			const { map } = res.data;
			const { name, points, categories } = map;
	
			all_markers = [...points ];

			setFilters( getFilters( Object.values( categories )));
			setFilterBy("*");
			setInfo({ heading: name });
			setLoading( false );
	
		})
		.catch( err => { });

	}, [ props.map_id ]);


	const getFilters = categories => {
		return categories && !!categories.length
			? categories.map(({ id, name, legend_image }) => (
				{ value: name === "Wszystkie" ? "*" : id, label: name, icon: legend_image }
			))
			: []
	}


	const onMarkerClick = id => {
		const founded_by_id = all_markers.filter( item => ( item.id === id ))?.[0]
		if ( founded_by_id ) {

			loadingWrap(() => {
				setPopupInfo({...founded_by_id });
				setView("popup");
			});
		} 
	}


	const backToCategories = e => {
		
		e.preventDefault();

		loadingWrap(() => {
			setPopupInfo( {} );
			setView("filters"); 
		});
	}


	const loadingWrap = func => {
		setLoading( true );
		setView("");

		setTimeout(() => {
			func();
			setLoading( false );
		}, 250)
	}


	const filters_props = {
		loading,
		info,
		link_to_all: props.link_to_all,
		filters,
		filter_by,
		setFilterBy
	}

	// console.log( markers );

	return (
		<div className={`map-with-pins-filtering ${ props.extra_classes || "" }`}>

			{ loading && <Loader/> }

			{ view === "filters" && <MapFilters {...filters_props } /> }

			{ !loading && view === "popup" && 
				<MapPopupInfo 
					{...popup_info } 
					returnBack={ backToCategories }  
				/> 
			}

			{ !loading && markers && 
				<GoogleMap 
					markers={ markers }
					onMarkerClick={ onMarkerClick }
				/> 
			}
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
