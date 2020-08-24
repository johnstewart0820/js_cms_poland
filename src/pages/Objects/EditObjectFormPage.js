import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";
import '../../styles/helpers/classes.scss';
import '../../styles/ObjectPages/EditObjectFromPage.scss';
import InputComponent from "../../components/form/InputComponent";
import Select from "../../components/form/Select";
import Row from "../../components/helpers/Row";
import Col from "../../components/helpers/Col";
import TextArea from "../../components/form/TextArea";
import AddImageButton from "../../components/form/AddImageButton";

const EditObjectFormPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);

    if (!loading) return <Container
        containerTitle={'EDYCJA OBJEKTU'}
        setNotification={!!notification && true}
        notificationMessage={notification}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'EDYCJA OBJEKTU'}
            setNotification={!!notification && true}
            notificationMessage={notification}
        >
            <div className='white-body'>
                <div className='white-body-container'>
                    <div className='white-body-container__inner'>
                        <Row>
                            <Col>
                                <div className='header-status-text'>
                                    <h5>STATUS</h5>
                                    <h4>NIE OPUBLIKOWANY</h4>
                                </div>
                            </Col>
                        </Row>
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
                        <Row>
                            <Col
                                colTitle={'obrazek wyróżniający'}
                            >
                                <AddImageButton
                                    buttonText={'lol'}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditObjectFormPage;