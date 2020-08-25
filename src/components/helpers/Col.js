import React from "react";
import '../../styles/helpers/col.scss';

const Col = props => (
    <div style={props.containerStyles} className={`col ${props.extraClasses ? props.extraClasses : ''}`}>
        {props.colTitle && <h3>{props.colTitle.toUpperCase()}</h3>}
        {props.children}
    </div>
)

export default Col;