import React from "react";
import '../../styles/buttons/ButtonWithLoader.scss';

const ButtonWithLoader = ({onClick, buttonText, isLoading}) => {
    return(
        <button
            className={'button-link green full-width loader-button'}
            onClick={onClick}
        >
            {buttonText}
            {isLoading && (
                <div className="button-loader">
                    <div className="button-loader-inner"/>
                </div>
            )}
        </button>
    )
}

export default ButtonWithLoader;
