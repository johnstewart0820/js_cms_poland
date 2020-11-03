import React from 'react';
import Loader from "./Loader";
import "../../styles/general/full-page-loader.scss";

const FullPageLoader = props => (
   <>
		<div className={`full-page-loader ${ props.extra_classes || "" }`}>
			<Loader/>
		</div>

		{ props.children }
	</>
);

export default FullPageLoader;
