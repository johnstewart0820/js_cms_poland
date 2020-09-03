import React from 'react';
import PropTypes from 'prop-types';

import Loader from "./Loader";
import "../../styles/general/full-page-loader.scss";

import { SiteInfoContextConsumer } from "../../constants/SiteInfoContext"; 

const FullPageLoader = ({ extra_classes, children }) => (
	<SiteInfoContextConsumer>
		{ ({ site_info_loading }) => (
			<>
				 
				<div className={`full-page-loader ${ site_info_loading ? "" : "hidden" }`}>
					<Loader />
				</div>
				
	
				{ !site_info_loading && children }
			</>
		)}
	</SiteInfoContextConsumer>
)

FullPageLoader.propTypes = { }

export default FullPageLoader;