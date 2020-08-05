import React from 'react';
import {Col, Row} from "react-bootstrap";
import Checkbox from "../form/Checkbox";

export const UserCategory = props => {
    return (
        <Col className="col-md-5">
            <div className="container-inner">
                <div className="user-category-header">
                    <div className="user-category__image">
                        <img alt='' src={require('../../svg/icons/user-photo.svg')}/>
                    </div>
                    <div className="user-category__text">
                        <h4>
                            {props.userName}
                        </h4>
                    </div>
                </div>
                <Row>
                    <h4>
                        POWIADOMIENIA Z KATEGORII
                    </h4>
                </Row>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <Checkbox
                            label={'systemowe'}
                        />
                        <Checkbox
                            label={'kultura'}
                        />
                        <Checkbox
                            label={'oświata'}
                        />
                        <Checkbox
                            label={'sport'}
                        />
                        <Checkbox
                            label={'turystyka'}
                        />
                    </div>
                </div>
            </div>
        </Col>
    )
}
