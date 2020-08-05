import React from 'react';

const getTransformDegree = ( direction ) => {
	return direction === "right" || !direction
			? "0"
			: direction === "bottom"
				? "90"
				: direction === "left"
					? "180"
					: direction === "top"
							? "270" : "0";
}

const Angle = ({ direction }) => (
	<svg 
		className="stroke"
		xmlns="http://www.w3.org/2000/svg" 
		width="7.705" 
		height="13.287" 
		viewBox="0 0 7.705 13.287" 
		transform={`rotate(${ getTransformDegree(direction) })`}
	>
		<path d="M5.168,10.46,0,5.045,5.291,0" transform="translate(6.705 11.874) rotate(180)" fill="rgba(0,0,0,0)" stroke="#324655" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
 	</svg>
)

Angle.propTypes = { }

export default Angle;
