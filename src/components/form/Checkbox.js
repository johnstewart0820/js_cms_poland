import React from 'react';
import '../../styles/form/checkbox.scss';

const Checkbox = props => (
    <div className="checkbox-container">
        <label>
            <input
                type="checkbox"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            />
            {props.label}
        </label>
    </div>
);

export default Checkbox;
