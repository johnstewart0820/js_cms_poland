import React from 'react';

const InputComponent = (props) => {
    return (
        <div className="input-container" style={props.containerStyles}>
            <div className="input-label-container">
                <h5 className="input-label">{props.fieldName}</h5>
            </div>
            <input
                className="input-default"
                value={props.value}
                name={props.name}
                type={props.type}
                onChange={props.inputHandler}
            />
            {props.inputImage && (
                <a className="button-password" onClick={props.switchHandler}>
                    <img  alt='' src={props.imageSrcForSwitch} />
                </a>
            )}
        </div>
    )
}

export default InputComponent;