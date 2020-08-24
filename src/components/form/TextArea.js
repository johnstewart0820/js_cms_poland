import React from "react";
import '../../styles/form/TextArea.scss';

const TextArea = ({label, placeholder, value, name, onChange, extraClasses}) => {
    return (
        <div className={`textarea-container ${ extraClasses || ''}`}>
            <div className="textarea-label">
                <h5>{label}</h5>
            </div>
            <textarea
                placeholder={placeholder}
                className="textarea"
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    )
}

export default TextArea;