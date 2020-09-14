import React from 'react';
import '../../styles/buttons/planer-button.scss';
import {NavLink} from "react-router-dom";
import PlanerContext from "../../constants/PlanerContext";

const PlanerButton = ({to}) => {
    const planerContext = React.useContext(PlanerContext);
    let planerEventsCount = planerContext.ids.length;

    return (
        planerContext.visible && planerEventsCount > 0 && (
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
                                        +{planerEventsCount || ''}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default PlanerButton;