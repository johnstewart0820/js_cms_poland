import React from 'react';
import PropTypes from 'prop-types';

import ButtonLink from "./ButtonLink";
import { PlusIcon } from '../../svg/icons';

const AddToPlanner = (props) => (
	<ButtonLink extra_classes="green"> <span> DODAJ DO PLANERA </span> <PlusIcon /> </ButtonLink>
)

AddToPlanner.propTypes = { }

export default AddToPlanner;