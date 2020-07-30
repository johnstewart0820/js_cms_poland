import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "../../styles/photoreports/loop-photo-report-post.scss";

const LoopPhotoReportPost = ({ id, title, date, thumbnail }) => (
	<Link to={`/photo-reports/${id}`} className="loop-photo-report-post thumbnail has-overlay" style={{ backgroundImage: `url(${ thumbnail })` }}>
		<div className="loop-photo-report-post__info">
			{ date && <div> { date } </div> }
			<div className="loop-photo-report-post__title heading"> { title } </div>
		</div>
	</Link>
)

LoopPhotoReportPost.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	title: PropTypes.string,
	date: PropTypes.string,
	thumbnail: PropTypes.string.isRequired
}

export default LoopPhotoReportPost;