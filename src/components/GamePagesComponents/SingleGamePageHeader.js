import React from 'react';

const SingeGamePageHeader = ({category, title, imageSrc}) => {
    return (
        <div className='single-game-header'>
            <div className='single-game-header-gray'>
                <div className='single-game-category'>
                    <p>
                        {category || ''}
                    </p>
                </div>
                <div className='single-game-header-gray-title'>
                    <p>
                        {title || ''}
                    </p>
                </div>
            </div>
            <div className='single-game-header-image'>
                <img alt='' src={imageSrc || ''}/>
            </div>
        </div>
    )
}

export default SingeGamePageHeader;