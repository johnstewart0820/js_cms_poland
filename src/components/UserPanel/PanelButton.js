import React from "react";
import '../../styles/UserPanel/PanelButton.scss';

const PanelButton = props => (
    <>
        <button
            onClick={ props.onClick }
            className={`panel-container__button ${ props.extraClasses || ''}`}>
         
			   <img alt='' src={ props.buttonImage } />
				<span> { props.buttonText } </span>
        </button>
    </>
)

export default PanelButton;