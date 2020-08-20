import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";

const EditObjectFormPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [notification, setNotification] = React.useState(null);

    if (!!loading) return <Container
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

        </Container>
    )
}

export default EditObjectFormPage;