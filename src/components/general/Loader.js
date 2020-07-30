import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/general/loader.scss';

const Loader = ({ extra_classes, style }) => (
	<div className={` loader ${ extra_classes || "" }`} style={ style }>
		<div className="cssload-whirlpool"></div>
	</div>
)

Loader.propTypes = {
	style: PropTypes.object
}

export default Loader;
