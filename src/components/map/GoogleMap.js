import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { google_key } from "../../extra/API";
import map_style from "../../extra/map_style.json";

export class GoogleMap extends Component{

	constructor(props){
		super(props);

		this.state = {
			bounds: null,
			center: null
		}
	}


	componentDidMount(){
		this.getBounds() 
	}


	componentDidUpdate( prev_props ) {
		if( prev_props.markers !== this.props.markers ) this.getBounds();
	}


	getBounds = () => {
		const { markers } = this.props;
		if( !markers || !(markers.length > 1) ) return null;

		const bounds = new window.google.maps.LatLngBounds();

		for (let i = 0; i < markers.length; i++) {
			const { lat, lng } = markers[ i ];
			bounds.extend( new window.google.maps.LatLng(lat, lng) );
		}

		this.setState({ bounds }); 
	}


	_mapLoaded( mapProps, map ) {
		map.setOptions({
			styles: map_style
		})
	}

	render(){

		const { markers } = this.props;

		const initialCenter = 
			markers && !!markers.length
			? { lat: markers[0].lat, lng: markers[0].lng }
			: { lat: 49.7205859, lng: 18.8085521 };


		return(
			<Map 
				google={ this.props.google }
				zoom={ 14 }
				containerStyle={{ width: "100%", height: "100%" }}

				zoomControl={ false }
				mapTypeControl={ false }
				fullscreenControl={ false }
				streetViewControl={ false }

				initialCenter={ initialCenter }
				center={ this.state.center }
				bounds={ this.state.bounds }

				onReady={( mapProps, map ) => this._mapLoaded(mapProps, map) }
			>


				{ markers && markers.length > 0 &&
					markers.map(({ lat, lng, name, icon }, index) => {

						const prop_icon = icon && icon.url && icon.width
							? {
								url: icon.url,
								anchor: new window.google.maps.Point( icon.width, icon.height || icon.width ),
							}
							: null

						return (
							<Marker 
								key={ index }	
								name={ name } 
								position={{ lat, lng }}
								icon={ prop_icon } 
							/>
						)
					})
				}
 
			
		 </Map>
		)
	}
};

export default GoogleApiWrapper({
	apiKey: ( google_key )
 })(GoogleMap)