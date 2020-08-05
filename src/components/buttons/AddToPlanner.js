import React from 'react';
import ButtonLink from "./ButtonLink";
import { PlusIcon } from '../../svg/icons';

const AddToPlanner = () => (
	<ButtonLink extra_classes="green"> <span> DODAJ DO PLANERA </span> <PlusIcon /> </ButtonLink>
)

AddToPlanner.propTypes = { }

export default AddToPlanner;