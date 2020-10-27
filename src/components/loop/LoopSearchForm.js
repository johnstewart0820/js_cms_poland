import React from 'react';
import PropTypes from "prop-types";

import LOOP_SEARCH_INPUTS from '../../extra/loop_search_inputs';
import {isFunction} from "../../extra/functions";

import "../../styles/buttons/button-link.scss";
import "../../styles/loop/loop-search-form.scss";
import wrapInArray from "../../extra/wrapInArray";
import TextButton from "../buttons/TextButton";

const initialValues = inputs => {
    let defaults = {};

    (!!inputs?.length ? inputs : []).forEach(input => {
        defaults = {
            ...defaults,
            [input.name]: input.options?.length ? input.options[0].value : '',
        };
    });

    return defaults;
};

const LoopSearchForm = props => {
    const inputs = props.inputs ? wrapInArray(props.inputs) : LOOP_SEARCH_INPUTS[props.type];

    const [values, setValues] = React.useState(initialValues(inputs));

    if (!inputs?.length)
        return null;

    const submitForm = e => {
        e.preventDefault();
        isFunction(props.submitCallback) && props.submitCallback(values);
    };

    return (
        <form className={`loop-search-form ${props.extraClasses || ''}`} onSubmit={submitForm}>
            <div className="container">
                <div className="heading">{props.heading}</div>

                <div className="row">
                    {inputs && !!inputs.length && inputs.map(item => (
                        <item.Component
                            key={item.id || item.name}
                            {...item}
                            onChange={e => setValues({...values, [e.target.name]: e.target.value})}
                        />
                    ))}

                    <button
                        type="submit"
                        className={`button-link form-button green ${props.submitButtonExtraClasses}`}
                    >
                        {props.submit_label || "Filtruj"}
                    </button>

                    {!!props.showResetButton && (
                        <TextButton className={'red'} onClick={props.onReset}>
                            Zresetuj filtry
                        </TextButton>
                    )}
                </div>
            </div>
        </form>
    );
};

LoopSearchForm.propTypes = {
    inputs: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    heading: PropTypes.string,
    submit_label: PropTypes.string,
    submitCallback: PropTypes.func,
    showResetButton: PropTypes.any,
    onReset: PropTypes.func,
    extraClasses: PropTypes.string,
    submitButtonExtraClasses: PropTypes.string,
};

export default LoopSearchForm;
