import React from 'react';
import '../../styles/form/checkbox.scss';

const Checkbox = props => (
    <div className="checkbox-container">
        <input
            type="checkbox"
            value={props.value}
            name={props.name}
            onChange={props.onChange}
        />
        <h6>
            {props.label}
        </h6>
    </div>
);

export default Checkbox;
