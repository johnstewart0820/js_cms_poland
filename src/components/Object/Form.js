import React from "react";
import Row from "../helpers/Row";
import InputComponent from "../form/InputComponent";
import Select from "../form/Select";
import TextArea from "../form/TextArea";

const Form = () => {
    return(
        <>
            <Row>
                <InputComponent fieldName={'NAZWA'} extraClasses={'edit-object-input'}/>
                <Select label={'TYP'} name={'type'} extra_classes={'edit-object-select'}/>
                <Select label={'TYP'} name={'TYP'} extra_classes={'edit-object-select'}/>
            </Row>
            <Row>
                <TextArea
                    label={'OPIS'}
                    placeholder={'Add please your description'}
                    extraClasses={'edit-object-textarea'}
                />
            </Row>
            <Row>
                <InputComponent
                    fieldName={'WWW'}
                />
                <InputComponent
                    fieldName={'MAIL'}
                />
            </Row>
            <Row>
                <InputComponent
                    fieldName={'MIASTO'}
                    extraClasses={'city-data-input'}
                />
                <InputComponent
                    fieldName={'KOD'}
                    extraClasses={'city-data-input'}
                />
                <InputComponent
                    fieldName={'ULICA'}
                    extraClasses={'city-data-input'}
                />
                <InputComponent
                    fieldName={'N'}
                    extraClasses={'city-data-input'}
                />
            </Row>
            <Row
                rowTitle={'wspołrzędne'}
            >
                <InputComponent
                    fieldName={'LAT'}
                    extraClasses={'coordinates-input'}
                />
                <InputComponent
                    fieldName={'LONG'}
                    extraClasses={'coordinates-input'}
                />
            </Row>
        </>
    )
}

export default Form;