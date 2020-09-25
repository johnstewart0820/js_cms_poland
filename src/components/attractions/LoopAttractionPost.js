import React from 'react';
import ShareButton from '../buttons/ShareButton';
import PlusButton from '../buttons/PlusButton';
import '../../styles/attractions/loop-attraction-post.scss';
import BicycleIcon from "../icons/BicycleIcon";
import DisabilityIcon from "../icons/DisabilityIcon";
import FamilyIcon from "../icons/FamilyIcon";
import PlanerContext from "../../constants/PlanerContext";
import {getArticleLink} from "../../extra/functions";

export default function (attraction) {
    const planerContext = React.useContext(PlanerContext);

    return (
        <div className="loop-card">
            <a
                href={getArticleLink(attraction)}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className="loop-card__thumbnail has-overlay thumbnail"
                style={{backgroundImage: `url(${attraction.thumbnail})`}}
            >
                <div className="loop-card__thumbnail-text">{attraction.category}</div>
            </a>

            <div className="loop-card__content-container">
                <div className="my-3 loop-card__icons">
                    <BicycleIcon/>
                    <DisabilityIcon/>
                    <FamilyIcon/>
                </div>
                <div className="loop-card__title heading">
                    <a href={getArticleLink(attraction)} target={'_blank'} rel={'noopener noreferrer'}>
                        {attraction.title}
                    </a>
                </div>

                {attraction.excerpt && <div className="loop-card__text">{attraction.excerpt}</div>}

                <div className="loop-card__action-buttons">
                    <PlusButton onClick={() => planerContext.add(attraction.id)}/>
                    <ShareButton link_for_sharing={window.location.origin + getArticleLink(attraction)}/>
                </div>
            </div>
        </div>
    );
};
