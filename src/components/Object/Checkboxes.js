import React from "react";
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import InputComponent from "../form/InputComponent";
import Checkbox from "../form/Checkbox";

const Checkboxes = () => {
    return(
        <>
            <Row
                extraClasses={'row-margin-top'}
            >
                <Col containerStyles={{flexBasis: '40%'}} colTitle={'odleglość od centrum'}/>
                <Col>
                    <InputComponent extraClasses={'km-input'} fieldName={'KM'}/>
                </Col>
            </Row>
            <Row
                extraClasses={'row-margin-top'}
            >
                <Col containerStyles={{flexBasis: '40%'}} colTitle={'Obsługa w  języku'}/>
                <Col
                    extraClasses={'col-with-checkboxes'}
                >
                    <Checkbox
                        labelRight={true}
                        label={'polski'}
                    />
                    <Checkbox
                        labelRight={true}
                        label={'angielski'}
                    />
                </Col>
                <Col>
                    <Checkbox
                        labelRight={true}
                        label={'niemiecki'}
                    />
                    <Checkbox
                        labelRight={true}
                        label={'czeski'}
                    />
                </Col>
            </Row>
            <Row
                extraClasses={'row-margin-top'}
            >
                <Col containerStyles={{flexBasis: '40%'}} colTitle={'lista udogodnień'}/>
                <Col
                    extraClasses={'col-with-checkboxes'}
                >
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Okolica'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'miejsce na ognisko'}
                        />
                        <Checkbox
                            labelRight={true}
                            label={'meble ogrodowe'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Narty'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'przechowanie nart'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Zwierzęta'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'Są akceptowane'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Rekreacja'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'klub dla dzieci'}
                        />
                        <Checkbox
                            labelRight={true}
                            label={'pokój gier'}
                        />
                    </Col>
                </Col>
                <Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Usługi recepcji'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'miejsce na ognisko'}
                        />
                        <Checkbox
                            labelRight={true}
                            label={'meble ogrodowe'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Ogólne'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'transfer'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Udogodnienia dla niepełnosprawnych'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'toaleta z uchwytami'}
                        />
                    </Col>
                    <Col
                        extraClasses={'col-margin-bottom'}
                        colTitle={'Centrum'}
                    >
                        <Checkbox
                            labelRight={true}
                            label={'basen'}
                        />
                        <Checkbox
                            labelRight={true}
                            label={'manicure'}
                        />
                    </Col>
                </Col>
            </Row>
        </>
    )
}

export default Checkboxes;