import React from 'react';
import '../../styles/PlanerList/PlanerItem.scss';
import ButtonX from "../buttons/ButtonX";


const PlanerItem = ({duration, description, category, imageSrc, step, onClick}) => {
    return (
        <>
            <div className='item-container'>
                <div className='item-counter'>
                    {step}
                </div>

                <div className="item-wrap">
                    <div className='item-image'>
                        {duration && (
                            <div className='time'>
                                {duration} min
                            </div>
                        )}
                        <img alt='' src={imageSrc || ''}/>
                        <button className='button-link green full-width'>ZOBACZ NA MAPIE</button>
                    </div>
                    <div className='item-description'>
                        <h4>
                            {description}
                        </h4>
                    </div>
                    <div className='item-category'>
                        <div className='item-category-content'>
                            {category}
                        </div>
                    </div>
                    <div className='item-action'>
                        <ButtonX onClick={onClick}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlanerItem;