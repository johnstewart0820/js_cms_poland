import React from 'react';

const RadioButton = ({containerStyles, label, ...rest}) => {
    return(
        <label style={containerStyles}>
            <input type="radio" {...rest} />
            {label}
        </label>
    );
};

export default RadioButton;
