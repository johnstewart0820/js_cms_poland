import React from 'react';
import '../../styles/buttons/planer-button.scss';
import {NavLink} from "react-router-dom";

const PlanerButton = ({number, to}) => {
    return (
        <div className='planer-button-container'>
            <div className='wrapper-three'>
                <div className='wrapper-two'>
                    <div className='wrapper-one'>
                        <NavLink to={to || ''} className='planer-button'>
                            <p>
                                PLANER
                            </p>
                            <div className='planer-button-inner'>
                                <p>
                                    +{number}
                                </p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanerButton;