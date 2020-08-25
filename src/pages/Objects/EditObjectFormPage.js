import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";
import '../../styles/helpers/classes.scss';
import '../../styles/ObjectPages/EditObjectFromPage.scss';
import Row from "../../components/helpers/Row";
import Col from "../../components/helpers/Col";
import Form from "../../components/Object/Form";
import ObjectsGallery from "../../components/Object/ObjectsGallery";
import Checkboxes from "../../components/Object/Checkboxes";


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
                        <Form/>
                        <ObjectsGallery/>
                        <Checkboxes/>
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