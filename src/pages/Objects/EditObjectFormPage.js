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
import Checkbox from "../../components/form/Checkbox";


const defaultItem = {
    image: '',
    title: '',
    description: '',
};

const EditObjectFormPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);
    const [items, setItems] = React.useState([defaultItem]);
    const [countPhotos, setCountPhotos] = React.useState(0);

    const addItem = () => setItems( [...items, defaultItem]);

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
                                extraClasses={'col-margin-right'}
                                colTitle={'obrazek wyróżniający'}
                            >
                                <AddImageButton
                                    greenButtonText={'ZAPISZ'}
                                />
                            </Col>
                            <Col
                                colTitle={'obrazek nagłówka'}
                            >
                                <AddImageButton
                                    greenButtonText={'ZAPISZ'}
                                >
                                    <InputComponent containerStyles={{margin: '10px'}} fieldName={'TYTUL ZDJECIA'}/>
                                    <InputComponent containerStyles={{margin: '10px'}} fieldName={'OPIS ZDJECIA'}/>
                                </AddImageButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col containerStyles={{flexBasis: '40%'}} colTitle={'galeria'}/>
                            <Col>
                                {items.map((item, index) => (
                                    <AddImageButton
                                        key={index}
                                        extraClasses={'add-image-button__margin-top'}
                                    >
                                        <InputComponent containerStyles={{margin: '10px'}} fieldName={'TYTUL ZDJECIA'}/>
                                        <InputComponent containerStyles={{margin: '10px'}} fieldName={'OPIS ZDJECIA'}/>
                                    </AddImageButton>
                                ))}
                                <button onClick={() => addItem()} className='button-link green button-add-item'>DODAJ</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col containerStyles={{flexBasis: '40%'}} colTitle={'pokoje'}/>
                            <Col>
                                {items.map((item, index) => (
                                    <AddImageButton
                                        key={index}
                                        extraClasses={'add-image-button__margin-top'}
                                    >
                                        <InputComponent containerStyles={{margin: '10px'}} fieldName={'TYTUL ZDJECIA'}/>
                                        <InputComponent containerStyles={{margin: '10px'}} fieldName={'OPIS ZDJECIA'}/>
                                    </AddImageButton>
                                ))}
                                <button onClick={() => addItem()} className='button-link green button-add-item'>DODAJ</button>
                            </Col>
                        </Row>
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
                        <Row extraClasses={'row-with-buttons'}>
                            <Col>
                                <button className="button-link green full-width">opublikuj</button>
                                <button className="button-link full-width">zapisz</button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditObjectFormPage;