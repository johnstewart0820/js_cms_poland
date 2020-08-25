import React from "react";
import '../../styles/form/AddImageButton.scss';
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import {PlusIcon} from "../../svg/icons";

const AddImageButton = ({children, greenButtonText, extraClasses}) => (
    <Row
        extraClasses={extraClasses}
    >
        <Col>
            <div className="add-image-button-container">
                <label className={'add-image-button__button'}>
                    <PlusIcon/>
                    <input type="file"/>
                </label>
            </div>
        </Col>
        <Col>
            <div className="add-image-description">
                {children}
                {!!greenButtonText && <button className='button-link green'>{greenButtonText}</button>}
            </div>
        </Col>
    </Row>
)

export default AddImageButton;