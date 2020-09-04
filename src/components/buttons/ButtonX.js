import React from 'react';
import '../../styles/buttons/button-x.scss';

const ButtonX = ({onClick}) => {
    return(
        <button
            onClick={onClick}
            className="list-view__button">
            <img alt='' src={require('../../svg/icons/cross.svg')}/>
        </button>
    )
}

export default ButtonX;