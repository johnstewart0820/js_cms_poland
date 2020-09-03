import React from 'react';
import PropTypes from "prop-types";

import LOOP_SEARCH_INPUTS from '../../extra/loop_search_inputs';
import {isFunction} from "../../extra/functions";

import "../../styles/buttons/button-link.scss";
import "../../styles/loop/loop-search-form.scss";

const LoopSearchForm = props => {
    const [values, setValues] = React.useState({});

    const inputs = LOOP_SEARCH_INPUTS[props.type];

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
                    {inputs && !!inputs.length && inputs.map(item => {
                        return (
                            <item.Component
                                key={item.id || item.name}
                                {...item}
                                onChange={e => setValues({...values, [e.target.name]: e.target.value})}
                            />
                        );
                    })}

                    <button
                        type="submit"
                        className={`button-link green ${props.submitButtonExtraClasses}`}
                    >
                        {props.submit_label || "Filtruj"}
                    </button>
                </div>
            </div>
        </form>
    );
};

LoopSearchForm.propTypes = {
    heading: PropTypes.string,
    submit_label: PropTypes.string,
    submitCallback: PropTypes.func,
    extraClasses: PropTypes.string,
    submitButtonExtraClasses: PropTypes.string,
};

export default LoopSearchForm;
