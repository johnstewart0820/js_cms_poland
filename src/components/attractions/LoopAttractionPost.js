import React from 'react';
import ShareButton from '../buttons/ShareButton';
import PlusButton from '../buttons/PlusButton';
import '../../styles/attractions/loop-attraction-post.scss';

export default function ({id, title, excerpt, category, thumbnail}) {
	return (
		<div className="loop-card">
			<div className="loop-card__thumbnail has-overlay thumbnail" style={{backgroundImage: `url(${ thumbnail })`}}>
				<div className="loop-card__thumbnail-text">{category}</div>
			</div>

			<div className="loop-card__content-container">
				<div className="loop-card__title heading">
					<a href={`#/attractions/${ id }`} target={'_blank'} rel={'noopener noreferrer'}>
						{title}
					</a>
				</div>

				{excerpt && <div className="loop-card__text">{excerpt}</div>}

				<div className="loop-card__action-buttons">
					<PlusButton/>
					<ShareButton link_for_sharing={`${window.location.origin}/attractions/${id}`} />
				</div>
			</div>
		</div>
	);
};
