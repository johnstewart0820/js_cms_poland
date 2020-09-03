import React from "react";
import Col from "../helpers/Col";
import Row from "../helpers/Row";
import {LogoWhite} from "../../svg/icons";
import '../../styles/events/PageDescription.scss';

export const PageDescription = ({logoText, descriptionText, buttonText}) => {
    return (
        <div className="gray-description">
            <Col>
                <Row>
                    <LogoWhite/>
                    <h4>
                        {logoText.toUpperCase()}
                    </h4>
                </Row>
            </Col>

            <Col>
                <p>
                    {descriptionText}
                </p>
            </Col>

            <Col>
                <button className="button-link green full-width">
                    {buttonText.toUpperCase()}
                </button>
            </Col>
        </div>
    )
}