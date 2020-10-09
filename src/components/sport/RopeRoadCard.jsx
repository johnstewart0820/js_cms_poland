import React from 'react';
import '../../styles/sport/RopeCard.scss';
import {
    DocumentIcon,
    ManWalkingIcon,
    SmallClockIcon,
    TwoWayArrowsHorizontalIcon,
    TwoWayArrowsVerticalIcon,
} from '../../svg/icons';

const RopeRoadCard = ({title, roadName, address, imageSource, onClickGreenButton, roadWidth, roadHeight, peoplePerHour, duration, rules}) => {
    return (
        <div className='rope-road-card'>
            <div className='rope-road-header'>
                <h3>{title && title.toUpperCase()}</h3>
                <p>{roadName}</p>
            </div>
            <div className='rope-road-address'>
                <div className='rope-address-container'>
                    <p>ADRES</p>
                    <h3>{address && address.toUpperCase()}</h3>
                </div>
            </div>
            <div className='rope-road-description'>
                <div className='rope-road-images'>
                    <TwoWayArrowsHorizontalIcon/>
                    <TwoWayArrowsVerticalIcon/>
                    <ManWalkingIcon/>
                    <SmallClockIcon/>
                    <DocumentIcon/>
                </div>
                <div className='rope-road-text'>
                    <p>{roadWidth && roadWidth}</p>
                    <p>{roadHeight && roadHeight}</p>
                    <p>{peoplePerHour && peoplePerHour}</p>
                    <p>{duration && duration}</p>
                    <p>{rules && rules}</p>
                </div>
            </div>
            <div className='rope-road-bottom'>
                <div className='rope-road-image'>
                    <img alt='' src={imageSource}/>
                    <div className='rope-road-image-name'>
                        <p>
                            {roadName && 'Kamera' + roadName}
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