import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/gallery/expanded-gallery-item.scss";


const ExpandedGalleryItem = ({ url, title, active }) => (
	<div className={`expanded-gallery-item ${ active ? "active" : "" }`}>
		<div className="expanded-gallery-item__photo">
			<img src={ url } alt={ title }/>
		</div>
	</div>
)

ExpandedGalleryItem.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string,
	active: PropTypes.bool.isRequired
}

export default ExpandedGalleryItem;