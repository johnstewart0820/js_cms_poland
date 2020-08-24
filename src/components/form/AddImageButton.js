import React from "react";
import '../../styles/form/AddImageButton.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import {PlusIcon} from "../../svg/icons";

const AddImageButton = ({children, buttonText}) => (
    <Row>
        <Col>
            <div className="add-image-button-container">
                <label className={'add-image-button__button'}>
                    <PlusIcon/>
                    <input type="file"/>
                </label>
            </div>
        </Col>
        <Col>
            {children}
            <button className='button-link green full-width'>{buttonText}</button>
        </Col>
    </Row>
)

export default AddImageButton;