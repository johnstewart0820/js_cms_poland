import React from "react";
import Col from "../helpers/Col";
import Row from "../helpers/Row";
import {LogoWhite} from "../../svg/icons";
import '../../styles/events/PageDescription.scss';

export const PageDescription = ({logoText, descriptionText, buttonText, href, onClick}) => {
    const ButtonContainer = href ? 'a' : 'button';

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
                <ButtonContainer className="button-link green full-width" href={href} onClick={onClick}>
                    {buttonText.toUpperCase()}
                </ButtonContainer>
            </Col>
        </div>
    )
}