import React from 'react';
import ButtonLink from "./ButtonLink";
import { PlusIcon } from '../../svg/icons';
import PlanerContext from "../../constants/PlanerContext";

const AddToPlanner = props => (
    <ButtonLink extra_classes="green" onClick={props.onClick}> <span> DODAJ DO PLANERA </span> <PlusIcon /> </ButtonLink>
)

AddToPlanner.propTypes = { }

export default AddToPlanner;