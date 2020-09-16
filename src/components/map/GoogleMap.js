import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { google_key } from "../../extra/API";
import { isFunction } from "../../extra/functions";
import map_style from "../../extra/map_style.json";


const GoogleMap = props => {
	
	const { markers, onMarkerClick } = props;

	const [ bounds, setBounds ] = useState( null );
	const [ initial_center, setInitialCenter ] = useState( {} );


	useEffect(() => {

		const initial_center = markers && !!markers.length
			? { lat: markers[0].lat, lng: markers[0].lng }
			: { lat: 49.7205859, lng: 18.8085521 };

		setInitialCenter( initial_center );

	}, []);
		

	useEffect(() => {
		
		const getBounds = () => {
			const { markers } = props;
			if ( !markers || !(markers.length > 1) ) return null;
	
			const bounds = new window.google.maps.LatLngBounds();
	
			for ( let i = 0; i < markers.length; i++ ) {
				const { lat, lng } = markers[ i ];
				bounds.extend( new window.google.maps.LatLng( lat, lng ));
			}
	
			setBounds( bounds ); 
		}
	

		getBounds();
		
	}, [ props.markers ]);


	const mapLoaded = ( mapProps, map ) => {
		map.setOptions({
			styles: map_style
		})
	}


	return (
		<Map 
			google={ props.google }
			zoom={ 14 }
			containerStyle={{ width: "100%", height: "100%" }}

			zoomControl={ true }
			mapTypeControl={ false }
			fullscreenControl={ false }
			streetViewControl={ false }

			initialCenter={ initial_center }
			bounds={ bounds }
			onReady={( mapProps, map ) => mapLoaded( mapProps, map )}
		>


			{ markers && !!markers.length &&
				markers.map(({ id, lat, lng, name, icon }, index) => {

					const prop_icon = 
						icon && icon.url && icon.width
							? {
								url: icon.url,
								anchor: new window.google.maps.Point( icon.width, icon.height || icon.width ),
							}
							: null;

					return (
						<Marker 
							key={ index }	
							name={ name } 
							position={{ lat, lng }}
							icon={ prop_icon }
							onClick={ e => {
								if ( isFunction(onMarkerClick )) onMarkerClick( id, lat, lng ) 
							}} 
						/>
					)
				})
			}

		
		</Map>
	)
}

GoogleMap.propTypes = {}

export default GoogleApiWrapper({
	apiKey: ( google_key )
 })(GoogleMap)