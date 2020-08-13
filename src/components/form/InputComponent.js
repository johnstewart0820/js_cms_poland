import React from 'react';
import '../../styles/form/input.scss'

const InputComponent = props => {
    const [visible, setVisible] = React.useState(false);

    const handleSwitch = () => {
        if (visible === false) {
            setVisible(true);
        } else {
            setVisible(false)
        }
    }

    return (
        <div className="input-container" style={props.containerStyles}>
            <div className="input-label-container">
                <h5 className="input-label">{props.fieldName}</h5>
            </div>
            <input
                className="input-default"
                value={props.value}
                name={props.name}
                type={props.password ? visible === true ? 'text' : 'password' : props.type}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            {props.visibilitySwitch && (
                <button className="button-password" onClick={handleSwitch}>
                    <img  alt='' src={props.imageSrcForSwitch} />
                </button>
            )}
        </div>
    )
}

export default InputComponent;