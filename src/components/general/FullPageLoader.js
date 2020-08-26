import React from 'react';
import PropTypes from 'prop-types';

import Loader from "./Loader";
import "../../styles/general/full-page-loader.scss";

const FullPageLoader = ({ extra_classes }) => (
	<div className={`full-page-loader ${ extra_classes || "" }`}>
		<Loader />
	</div>
)

FullPageLoader.propTypes = { }

export default FullPageLoader;