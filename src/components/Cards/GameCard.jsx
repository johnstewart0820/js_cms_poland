import React from "react";
import Col from "../helpers/Col";
import DefaultImage from "../../constants/DefaultImage";
import {PlaneIcon} from "../../svg/icons";
import ButtonLink from "../buttons/ButtonLink";
import '../../styles/StadiumReservationPages/Card.scss';

const GameCard = ({field_playground_category, title, original_image, onClickGreenButton, greenButtonText, extraClasses, eyeButtonImage, onClickPlaneButton}) => {
    return (
        <Col>
            <div className={`card ${extraClasses ? extraClasses : ''}`}>
                <div className="card__thumbnail thumbnail has-overlay" style={{backgroundImage: `url("${original_image || DefaultImage}")`}}>
                    <div className="card__name">
                        {field_playground_category}
                    </div>
                    <button className="button__eye">{eyeButtonImage}</button>
                </div>

                <div className="card__content">
                    <div className="card__title">
                        {title}
                    </div>

                    <div className="card__bottom">
                        <ButtonLink extra_classes="green" onClick={onClickGreenButton}> {greenButtonText ? greenButtonText.toUpperCase() : "REZERWACJA"} </ButtonLink>
                        <button className="send__button" onClick={onClickPlaneButton}><PlaneIcon/></button>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default GameCard;