import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/gallery/gallery-item.scss";

const GalleryItem = ({ url, index, title, onClick }) => (

	url ?
	( <div
			title={ title }
			onClick={ () => onClick( index ) }
			className="gallery-item thumbnail"  
			style={{ backgroundImage: `url("${ url }")` }}
		/>
	)
	: null
)

GalleryItem.propTypes = { 
	url: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired, 
	title: PropTypes.string,
	onClick: PropTypes.func.isRequired
}

export default GalleryItem;