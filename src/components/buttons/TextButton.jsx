import React from "react";
import "../../styles/buttons/text-button.scss";

export default function TextButton({children, className, ...rest}) {
    return (
        <button type={'button'} className={`text-button ${className}`} {...rest}>
            {children}
        </button>
    );
};
