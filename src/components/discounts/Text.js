import React from "react";
import '../../styles/discounts/Text.scss';

const Text = ({description, title}) => {
    return(
        <div className='text-container'>
            <h4>
                {title}
            </h4>
            <p>
                {description}
            </p>
        </div>
    )
}

export default Text;