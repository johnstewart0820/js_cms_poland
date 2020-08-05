import React from 'react';

import ShareButton from '../buttons/ShareButton';
import AddToPlanner from '../buttons/AddToPlanner';

const SingleContentBottom = () => (
	<div className="single-content-bottom">
		<AddToPlanner />
		<ShareButton />
	</div>
)

SingleContentBottom.propTypes = { }

export default SingleContentBottom;