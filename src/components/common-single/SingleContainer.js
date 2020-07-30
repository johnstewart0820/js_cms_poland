import React from 'react';
import PropTypes from 'prop-types';

const SingleContainer = ({ title, extra_classes, children }) => (
	<div className={`single-container ${ extra_classes || "" }`}>

		{ title && <div className="heading"> { title } </div> }

		{ children }
	</div>
)

SingleContainer.propTypes = {
	title:PropTypes.string,
	extra_classes:PropTypes.string
}

export default SingleContainer;