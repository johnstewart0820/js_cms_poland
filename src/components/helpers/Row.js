import React from "react";
import '../../styles/helpers/row.scss';

const Row = props => (
    <div className='row'>
        {props.children}
    </div>
)

export default Row;