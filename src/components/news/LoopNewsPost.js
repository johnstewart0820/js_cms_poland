import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/news/loop-news-post.scss";

const LoopNewsPost = ({ id, title, categories_labels, original_image, desc, published_from }) => (
	<Link to={`/news/${ id }`} className="loop-news-post">
		<div className="loop-news-post__thumbnail has-overlay thumbnail" style={{ backgroundImage: `url(${ original_image })` }} >
			<div className="loop-news-post__category"> { categories_labels } </div>
		</div>
		
		<div className="loop-news-post__content">
			<div className="loop-news-post__date"> { published_from } </div>
			<div className="loop-news-post__title heading"> { title } </div>
			<div className="loop-news-post__desc"> { desc } </div>
		</div>
	</Link>
)

LoopNewsPost.propTypes = { }

export default LoopNewsPost;