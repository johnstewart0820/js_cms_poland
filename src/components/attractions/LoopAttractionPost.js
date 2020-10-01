import React from 'react';
import ShareButton from '../buttons/ShareButton';
import PlusButton from '../buttons/PlusButton';
import '../../styles/attractions/loop-attraction-post.scss';
import BicycleIcon from "../icons/BicycleIcon";
import DisabilityIcon from "../icons/DisabilityIcon";
import FamilyIcon from "../icons/FamilyIcon";
import PlanerContext from "../../constants/PlanerContext";
import DefaultImage from "../../constants/DefaultImage";
import {getArticleLink} from "../../extra/functions";
import {Link} from "react-router-dom";

export default function (attraction) {
    const planerContext = React.useContext(PlanerContext);

    return (
        <div className="loop-card">
            <Link
                to={getArticleLink(attraction)}
                className="loop-card__thumbnail has-overlay thumbnail"
                style={{backgroundImage: `url("${attraction.image || DefaultImage}")`}}
            >
                <div className="loop-card__thumbnail-text">{attraction.categories_labels}</div>
            </Link>

            <div className="loop-card__content-container">
                <div className="my-3 loop-card__icons">
                    <BicycleIcon/>
                    <DisabilityIcon/>
                    <FamilyIcon/>
                </div>
                <div className="loop-card__title heading">
                    <Link to={getArticleLink(attraction)}>
                        {attraction.title}
                    </Link>
                </div>

                {attraction.short && <div className="loop-card__text">{attraction.short}</div>}

                <div className="loop-card__action-buttons">
                    <PlusButton onClick={() => planerContext.add(attraction.id)}/>
                    <ShareButton link_for_sharing={window.location.origin + getArticleLink(attraction)}/>
                </div>
            </div>
        </div>
    );
};
