import React from "react";
import {Container} from "../../components/UserPanel/Container";
import Loader from "../../components/general/Loader";

const EditObjectFormPage = () => {
    const [loading, setLoading] = React.useState(true);

    if (!!loading) return <Container
        containerTitle={'EDYCJA OBJEKTU'}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'EDYCJA OBJEKTU'}
        >

        </Container>
    )
}

export default EditObjectFormPage;