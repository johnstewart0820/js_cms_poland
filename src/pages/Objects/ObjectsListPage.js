import React from "react";
import {Container} from "../../components/UserPanel/Container";
import '../../styles/StadiumReservationPages/ReservationHistoryPage.scss';
import TourismRoutes from "../../constants/TourismRoutes";
import Loader from "../../components/general/Loader";

const ObjectListPage = () => {
    const [data, getData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    if (!!loading) return <Container
        containerTitle={'MOJE OBIEKTY'}
    >
        <div className="loader-container">
            <Loader/>
        </div>
    </Container>

    return(
        <Container
            containerTitle={'MOJE OBIEKTY'}
            addContainerButton={true}
            textForContainerButton={'DODAJ OBIEKT'}
            routeForContainerButton={TourismRoutes.EditObjectFormPage}
        >
            <div className="list-container">
                <div className="list-view__container">
                    <div className="list-view__list">
                        <table>
                            <thead>
                            <tr>
                                <td style={{textAlign: "left"}}>
                                    Nazwa obiektu
                                </td>
                                <td>
                                    Data
                                </td>
                                <td>
                                    Typ
                                </td>
                                <td>
                                    Status
                                </td>
                                <td>
                                    Action
                                </td>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ObjectListPage;