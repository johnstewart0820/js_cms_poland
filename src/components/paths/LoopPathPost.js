import React from 'react';
import ShareButton from '../buttons/ShareButton';
import PlusButton from '../buttons/PlusButton';
import '../../styles/attractions/loop-attraction-post.scss';
import BicycleIcon from "../icons/BicycleIcon";
import DisabilityIcon from "../icons/DisabilityIcon";
import FamilyIcon from "../icons/FamilyIcon";
import HikingIcon from "../icons/HikingIcon";
import PlanerContext from "../../constants/PlanerContext";


export default function ({id, title, excerpt, category, thumbnail}) {
    const planerContext = React.useContext(PlanerContext);

    return (
        <div className="loop-card">
            <a
                href={`/attractions/${id}`}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className="loop-card__thumbnail has-overlay thumbnail"
                style={{backgroundImage: `url(${thumbnail})`}}
            >
                <div className="loop-card__thumbnail-text">{category}</div>
            </a>

            <div className="loop-card__content-container">
                <div className="my-3 d-flex justify-content-between">
                    <div className="loop-card__icons">
                        <BicycleIcon/>
                        <DisabilityIcon/>
                        <FamilyIcon/>
                    </div>
                    <div className="loop-card__icons d-flex align-items-center">
                        <HikingIcon/>
                        <div className="d-inline-block heading">
                            4H
                        </div>
                    </div>
                </div>
                <div className="loop-card__title heading">
                    <a href={`/attractions/${id}`} target={'_blank'} rel={'noopener noreferrer'}>
                        {title}
                    </a>
                </div>

                {excerpt && <div className="loop-card__text">{excerpt}</div>}

                <div className="loop-card__action-buttons">
                    <PlusButton onClick={() => planerContext.add(id)}/>
                    <ShareButton link_for_sharing={`${window.location.origin}/attractions/${id}`}/>
                </div>
            </div>
        </div>
    );
};
