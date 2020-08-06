import React from 'react';
import {UserPanel} from "./UserPanel";
import {Row} from "react-bootstrap";
import '../../styles/UserPanel/Container.scss'

export const Container = props => {
    return(
        <div className="custom-container">
            <UserPanel/>
            <div className="container-fluid">
                <Row>
                    <div className="page-title">
                        <img alt="" src={require('../../svg/icons/logo-black.svg')}/>
                        <h3>
                            {props.containerTitle}
                        </h3>
                    </div>
                </Row>
                {props.children}
            </div>
        </div>
    )
}