import React from "react";
import '../../styles/helpers/col.scss';

const Col = props => (
    <div className='col'>
        {props.children}
    </div>
)

export default Col;