import React from 'react';
import '../../styles/sport/RopeCard.scss';
import {
    DocumentIcon,
    ManWalkingIcon,
    SmallClockIcon,
    TwoWayArrowsHorizontalIcon,
    TwoWayArrowsVerticalIcon,
} from '../../svg/icons';
import ButtonLink from "../buttons/ButtonLink";
import {getArticleLink} from "../../extra/functions";

const RopeRoadCard = ({roadType, ...article}) => {
    return (
        <div className='rope-road-card'>
            <div className='rope-road-header'>
                <h3>{article.title && article.title.toUpperCase()}</h3>
                <p>{roadType}</p>
            </div>
            <div className='rope-road-address'>
                <div className='rope-address-container'>
                    <p>ADRES</p>
                    <h3>{article.acf.field_map_address && article.acf.field_map_address.toUpperCase()}</h3>
                </div>
            </div>
            <div className='rope-road-description'>
                <div className='rope-road-images'>
                    {article.acf.field_lift_length && <TwoWayArrowsHorizontalIcon/>}
                    {article.acf.field_lift_elevation && <TwoWayArrowsVerticalIcon/>}
                    {article.acf.field_lift_capacity && <ManWalkingIcon/>}
                    {article.acf.field_lift_time && <SmallClockIcon/>}
                    {article.acf.rules && <DocumentIcon/>}
                </div>
                <div className='rope-road-text'>
                    {article.acf.field_lift_length && <p>{article.acf.field_lift_length}</p>}
                    {article.acf.field_lift_elevation && <p>{article.acf.field_lift_elevation}</p>}
                    {article.acf.field_lift_capacity && <p>{article.acf.field_lift_capacity}</p>}
                    {article.acf.field_lift_time && <p>{article.acf.field_lift_time}</p>}
                    {article.acf.rules && <p>{article.acf.rules}</p>}
                </div>
            </div>
            <div className='rope-road-bottom'>
                <div className='rope-road-image thumbnail' style={{ backgroundImage: `url(${ article.original_image || "" })` }}>
						<div className='rope-road-image-name'>
                        <p>
                            {article.title && 'Kamera ' + article.title}
                        </p>
                    </div>
                </div>
                <ButtonLink
                    extra_classes="green rope-road-button"
                    path={getArticleLink(article)}
                >
                    DOWIEDZ SI?? WI??CEJ
                </ButtonLink>
            </div>
        </div>
    )
}

export default RopeRoadCard;