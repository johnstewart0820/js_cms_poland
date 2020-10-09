import React from 'react';
import '../../styles/sport/RopeCard.scss';
import {
    DocumentIcon,
    ManWalkingIcon,
    SmallClockIcon,
    TwoWayArrowsHorizontalIcon,
    TwoWayArrowsVerticalIcon,
} from '../../svg/icons';

const RopeRoadCard = ({title, roadName, field_map_address, original_image, onClickGreenButton, field_lift_length, field_lift_elevation, field_lift_capacity, field_lift_time, rules}) => {
    return (
        <div className='rope-road-card'>
            <div className='rope-road-header'>
                <h3>{title && title.toUpperCase()}</h3>
                <p>{roadName}</p>
            </div>
            <div className='rope-road-address'>
                <div className='rope-address-container'>
                    <p>ADRES</p>
                    <h3>{field_map_address && field_map_address.toUpperCase()}</h3>
                </div>
            </div>
            <div className='rope-road-description'>
                <div className='rope-road-images'>
                    {field_lift_length && <TwoWayArrowsHorizontalIcon/>}
                    {field_lift_elevation && <TwoWayArrowsVerticalIcon/>}
                    {field_lift_capacity && <ManWalkingIcon/>}
                    {field_lift_time && <SmallClockIcon/>}
                    {rules && <DocumentIcon/>}
                </div>
                <div className='rope-road-text'>
                    {field_lift_length && <p>{field_lift_length}</p>}
                    {field_lift_elevation && <p>{field_lift_elevation}</p>}
                    {field_lift_capacity && <p>{field_lift_capacity}</p>}
                    {field_lift_time && <p>{field_lift_time}</p>}
                    {rules &&<p>{rules}</p>}
                </div>
            </div>
            <div className='rope-road-bottom'>
                <div className='rope-road-image'>
                    {original_image && <img alt='' src={original_image}/>}
                    <div className='rope-road-image-name'>
                        <p>
                            {title && 'Kamera ' + title}
                        </p>
                    </div>
                </div>
                <button
                    className='button-link green full-width'
                    onClick={onClickGreenButton}
                >
                    DOWIEDZ SIE WIĘCEJ
                </button>
            </div>
        </div>
    )
}

export default RopeRoadCard;