import React from 'react';
import {CircleButton} from "./CircleButton";
import {Col, Row} from "react-bootstrap";

const Card = props => {
    return(
        <Col>
            <div className="card">
                <img alt="" src={props.headerImageSource}/>
                <div className="card-inner-container">
                    <h3>{props.title}</h3>
                    <p>ADRES</p>
                    <h4>
                        {props.address}
                    </h4>
                    <Row>
                        <button className="button-link green">Rezerwacja</button>
                        <CircleButton
                            circleButtonSrc={require('../../svg/icons/social-plus.svg')}
                        />
                        <CircleButton
                            circleButtonSrc={require('../../svg/icons/share.svg')}
                        />
                    </Row>
                </div>
            </div>
        </Col>
    )
}

export default Card;