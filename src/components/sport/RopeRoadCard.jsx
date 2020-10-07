import React from 'react';
import '../../styles/sport/RopeCard.scss';

const RopeRoadCard = ({title, roadName, address, description}) => {
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

            </div>
            <div className='rope-road-bottom'>
                <button className='button-link green full-width'>DOWIEDZ SIE WIĘCEJ</button>
            </div>
        </div>
    )
}

export default RopeRoadCard;