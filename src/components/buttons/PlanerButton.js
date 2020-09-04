import React from 'react';
import '../../styles/buttons/planer-button.scss';

const PlanerButton = ({number}) => {
    return (
        <div className='planer-button-container'>
            <div className='wrapper-three'>
                <div className='wrapper-two'>
                    <div className='wrapper-one'>
                        <div className='planer-button'>
                            <p>
                                PLANER
                            </p>
                            <div className='planer-button-inner'>
                                <p>
                                    +{number}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanerButton;