import React from 'react';
import PropTypes from 'prop-types';

const MapPin = ({ color = "#3D5567"}) => (
	<svg className="fill map-pin" xmlns="http://www.w3.org/2000/svg" width="15.329" height="18.947" viewBox="0 0 15.329 18.947">
		<path d="M163.1-50.706A7.543,7.543,0,0,0,156.809-54a7.543,7.543,0,0,0-6.289,3.294,7.651,7.651,0,0,0-.891,7.049,6.025,6.025,0,0,0,1.111,1.834l5.565,6.537a.662.662,0,0,0,.5.233.662.662,0,0,0,.5-.233l5.563-6.535a6.031,6.031,0,0,0,1.11-1.831A7.653,7.653,0,0,0,163.1-50.706Z" transform="translate(-149.144 54)" fill={ color }/>
	</svg>
)

MapPin.propTypes = { color: PropTypes.string }

export default MapPin;