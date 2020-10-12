import React from "react";

const EmptyList = ({children, className}) => (
    <div className={className}>
        <p>{children}</p>
    </div>
);
export default EmptyList;
