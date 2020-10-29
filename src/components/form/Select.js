import React from 'react';
import PropTypes from 'prop-types';
import "../../styles/form/select.scss";
import Angle from '../../svg/components/Angle';
import {GreenArrowIcon} from "../../svg/icons";

const Select = ({name, id, value, options, label, extra_classes, onChange, addEmptyOption, emptyOptionLabel, defaultValue, selectImageColor}) => {
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
        if (selectedValue !== value)
            setSelectedValue(value);
    }, [value]);

    const change = e => {
        setSelectedValue(e.target.value);
        !!onChange && onChange(e);
    };

    return (
        <div className={`form-select ${extra_classes || ""}`}>
            <label className="form-select__label" htmlFor={name || id}> {label} </label>
            {selectImageColor === 'green' ? <GreenArrowIcon/> : <Angle direction="bottom"/>}
            <select defaultValue={defaultValue} name={name} id={name || id} onChange={change}>
                {addEmptyOption && <option value="default">{emptyOptionLabel ? emptyOptionLabel : ''}</option>}
                {options && options.length > 0 && options.map(({value, label}) => (
                    <option
                        key={value}
                        value={value}
                        selected={value ? value === selectedValue : false}
                    >
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired,
        ]).isRequired,
        label: PropTypes.string.isRequired,
    })),
    extra_classes: PropTypes.string,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

export default Select;
