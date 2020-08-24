import React from "react";
import '../../styles/helpers/row.scss';

const Row = props => (
    <>
        {props.rowTitle && (
            <div className='row'>
                <h3 className='row-title'>{props.rowTitle.toUpperCase()}</h3>
            </div>
        )}
        <div className='row'>
            {props.children}
        </div>
    </>
)

export default Row;