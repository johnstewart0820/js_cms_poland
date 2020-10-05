import React from "react";
import Parser from "html-react-parser";
import "../../styles/spa/LoopSpaPost.scss";

export default function LoopSpaPost(props) {
    return (
        <div className="single-spa__container">
            <h2>{props.field_offer_for_patients_title}</h2>
            <div>{Parser(props.field_offer_for_patients_description)}</div>
        </div>
    );
};
