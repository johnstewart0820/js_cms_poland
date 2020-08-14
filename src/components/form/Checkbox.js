import React from 'react';
import '../../styles/form/checkbox.scss';

const Checkbox = props => (
    <div className="checkbox-container">
        <label>
            {props.labelLeft && props.label}
            <input
                type="checkbox"
                value={props.value}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.labelRight && props.label}
        </label>
    </div>
);

export default Checkbox;
