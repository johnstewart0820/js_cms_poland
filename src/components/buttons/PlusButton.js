import React from 'react';
import PropTypes from 'prop-types';
import {PlusIcon} from '../../svg/icons';
import '../../styles/buttons/plus-button.scss';

const PlusButton = props => (
    <div className={`plus-button ${props.extraClasses}`}>
        <button onClick={props.onClick}>
            <PlusIcon/>
            <span className="d-none">add</span>
        </button>
    </div>
);

PlusButton.propTypes = {
    onClick: PropTypes.func,
};

export default PlusButton;
