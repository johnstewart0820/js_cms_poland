import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";
import '../../styles/helpers/classes.scss';
import '../../styles/ObjectPages/EditObjectFromPage.scss';
import InputComponent from "../../components/form/InputComponent";
import Select from "../../components/form/Select";
import Row from "../../components/helpers/Row";
import Col from "../../components/helpers/Col";

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

                        <div className='elements-container'>
                            <Row>
                                <InputComponent fieldName={'NAZWA'}/>
                                <Select label={'TYP'} name={'type'}/>
                                <Select label={'TYP'} name={'TYP'}/>
                            </Row>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EditObjectFormPage;