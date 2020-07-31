import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CircleButton} from "./CircleButton";

export const Card = props => {
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
                        <CircleButton/>
                        <CircleButton/>
                    </Row>
                </div>
            </div>
        </Col>
    )
}