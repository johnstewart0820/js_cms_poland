import React from 'react';
import '../../styles/form/checkbox.scss';

const Checkbox = props => (
    <div className="checkbox-container">
        <label>
            {props.labelLeft && props.label.toUpperCase()}
            <input
                type="checkbox"
                value={props.value}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.labelRight && props.label.toUpperCase()}
        </label>
    </div>
);

export default Checkbox;
