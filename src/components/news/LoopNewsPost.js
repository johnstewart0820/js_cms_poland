import React from 'react';
import { Link } from "react-router-dom";

import "../../styles/news/loop-news-post.scss";
import DefaultImage from "../../constants/DefaultImage";

const LoopNewsPost = ({slug, title, categories_labels, image, short, published_from}) => (
	<Link to={'/' + slug} className="loop-news-post">
		<div className="loop-news-post__thumbnail has-overlay thumbnail" style={{backgroundImage: `url("${image || DefaultImage}")`}}>
			<div className="loop-news-post__category">{categories_labels}</div>
		</div>

		<div className="loop-news-post__content">
			<div className="loop-news-post__date">{published_from}</div>
			<div className="loop-news-post__title heading">{title}</div>
			<div className="loop-news-post__desc" dangerouslySetInnerHTML={{__html: short}} />
		</div>
	</Link>
);

export default LoopNewsPost;
