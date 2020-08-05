import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/news/loop-news-post.scss";

const LoopNewsPost = ({ id, title, category, thumbnail, desc, date }) => (
	<Link to={`/news/${ id }`} className="loop-news-post">
		<div className="loop-news-post__thumbnail has-overlay thumbnail" style={{ backgroundImage: `url(${ thumbnail })` }} >
			<div className="loop-news-post__category"> { category } </div>
		</div>
		
		<div className="loop-news-post__content">
			<div className="loop-news-post__date"> { date } </div>
			<div className="loop-news-post__title heading"> { title } </div>
			<div className="loop-news-post__desc"> { desc } </div>
		</div>
	</Link>
)

LoopNewsPost.propTypes = { }

export default LoopNewsPost;