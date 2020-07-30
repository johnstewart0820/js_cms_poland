import React from 'react';
import PropTypes from 'prop-types';

import ShareButton from '../buttons/ShareButton';
import AddToPlanner from '../buttons/AddToPlanner';

const SingleContentBottom = (props) => (
	<div className="single-content-bottom">
		<AddToPlanner />
		<ShareButton />
	</div>
)

SingleContentBottom.propTypes = { }

export default SingleContentBottom;