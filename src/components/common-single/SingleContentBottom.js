import React from 'react';

import ShareButton from '../buttons/ShareButton';
import AddToPlanner from '../buttons/AddToPlanner';

const SingleContentBottom = props => (
	<div className="single-content-bottom">
		<AddToPlanner onClick={props.onAddToPlaner}/>
		<ShareButton horizontal />
	</div>
)

SingleContentBottom.propTypes = { }

export default SingleContentBottom;