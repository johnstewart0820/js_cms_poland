import React from 'react';
import { Link } from "react-router-dom";
import "../../styles/news/loop-news-post.scss";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";

const LoopNewsPost = props => (
	<Link to={getArticleLink(props)} className="loop-news-post">
		<div className="loop-news-post__thumbnail has-overlay thumbnail" style={{backgroundImage: `url("${props.image || DefaultImage}")`}}>
			<div className="loop-news-post__category">{props.categories_labels}</div>
		</div>

		<div className="loop-news-post__content">
			<div className="loop-news-post__date">{props.published_from}</div>
			<div className="loop-news-post__title heading">{props.title}</div>
			<div className="loop-news-post__desc" dangerouslySetInnerHTML={{__html: props.short}} />
		</div>
	</Link>
);

export default LoopNewsPost;
