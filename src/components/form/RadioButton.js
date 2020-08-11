import React from 'react';

const RadioButton = ({label, onChange, value, name, containerStyles}) => {
    return(
        <label style={containerStyles}>
            <input
                type="radio"
                onChange={onChange}
                value={value}
                name={name}
            />
            {label}
        </label>
    )
}

export default RadioButton;