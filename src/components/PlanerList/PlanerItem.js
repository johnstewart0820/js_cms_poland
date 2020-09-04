import React from 'react';
import '../../styles/PlanerList/PlanerItem.scss';
import ButtonX from "../buttons/ButtonX";


const PlanerItem = ({duration, description, category, categoryImg}) => {
    return (
        <div className='item-container'>
            <div className='item-image'>
                <div className='time'>
                    {duration} min
                </div>
                <img alt='' src={require('../../img/image-planer.png')}/>
                <button className='button-link green full-width'>ZOBACZ NA MAPIE</button>
            </div>
            <div className='item-description'>
                <h4>
                    {description}
                </h4>
            </div>
            <div className='item-category'>
                <div className='item-category-content'>
                    {/*<img alt='' src={require('../../../public/img/pins/attractions.png')}/>*/}
                    Atrakcje
                </div>
            </div>
            <div className='item-action'>
                <ButtonX/>
            </div>
        </div>
    )
}

export default PlanerItem;