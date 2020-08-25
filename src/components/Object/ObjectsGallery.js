import React from "react";
import Row from "../helpers/Row";
import Col from "../helpers/Col";
import AddImageButton from "../form/AddImageButton";
import InputComponent from "../form/InputComponent";

const defaultItem = {
    image: '',
    title: '',
    description: '',
};

const ObjectsGallery = () => {
    const [items, setItems] = React.useState([defaultItem]);
    const addItem = () => setItems( [...items, defaultItem]);
    return(
        <>
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
        </>
    )
}

export default ObjectsGallery;