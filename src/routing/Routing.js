import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {SITE} from "../extra/site_settings.js";
import MainRouters from "./MainRouters";
import TourismRouters from "./TourismRouters";
import PageRenderer from "../extra/PageRenderer";
import NotFoundPage from "../pages/NotFoundPage";
import TourismRoutes from "../constants/TourismRoutes";
import PlanerListPage from "../pages/common/PlanerListPage";
import LoginPage from "../pages/UserPanelPages/LoginRegistration/LoginPage";
import RegistrationPage from "../pages/UserPanelPages/LoginRegistration/RegistrationPage";
import RegistrationConfirmationPage from "../pages/UserPanelPages/LoginRegistration/RegistrationConfirmationPage";
import ActivateAccountPage from "../pages/UserPanelPages/LoginRegistration/ActivateAccountPage";
import CourtsWithCardsPage from "../pages/UserPanelPages/StadiumReservation/CourtsWithCardsPage";
import UserProfilePage from "../pages/UserPanelPages/UserProfile/UserProfilePage";
import ReservationConfirmationPage from "../pages/UserPanelPages/StadiumReservation/ReservationConfirmationPage";
import ReservationCalendarPage from "../pages/UserPanelPages/StadiumReservation/ReservationCalendarPage";
import ReservationHistoryPage from "../pages/UserPanelPages/StadiumReservation/ReservationsHistoryListPage";
import RegisterToEventListPage from "../pages/UserPanelPages/RegisterToEvent/RegisterToEventListPage";
import RegisterToEventConfirmationPage from "../pages/UserPanelPages/RegisterToEvent/RegisterToEventConfirmationPage";
import ObjectListPage from "../pages/UserPanelPages/Objects/ObjectsListPage";
import EditObjectFormPage from "../pages/UserPanelPages/Objects/EditObjectFormPage";
import GameCardsPage from "../pages/UserPanelPages/Game/GameCardsPage";
import SingleGamePage from "../pages/UserPanelPages/Game/SingleGamePage";
import RegisterToEventFormPage from "../pages/UserPanelPages/RegisterToEvent/RegisterToEventFormPage";
import SiteInfoContext from "../constants/SiteInfoContext";

const ROUTERS = {
    "MAIN": <MainRouters/>,
    "TOURISM": <TourismRouters/>
}

const Routing = () => {
    const context = React.useContext(SiteInfoContext);

    return (
        <Switch>
            {/* Planer list */}
            <Route exact path={TourismRoutes.PlanerListPage} component={PlanerListPage}/>

            {/* Authorization pages */}
            <Route exact path={TourismRoutes.Login} component={LoginPage} />
            <Route exact path={TourismRoutes.Registration} component={RegistrationPage} />
            <Route exact path={TourismRoutes.RegistrationConfirmation} component={RegistrationConfirmationPage} />
            <Route exact path={TourismRoutes.ActivateAccount} component={ActivateAccountPage}/>

            {/* User panel pages */}
            <Route exact path={TourismRoutes.UserProfile} component={UserProfilePage}/>
            <Route exact path={TourismRoutes.StadiumReservation} component={CourtsWithCardsPage}/>
            <Route exact path={TourismRoutes.ReservationConfirmationPage} component={ReservationConfirmationPage}/>
            <Route exact path={TourismRoutes.Reservation()} component={ReservationCalendarPage}/>
            <Route exact path={TourismRoutes.ReservationHistoryPage} component={ReservationHistoryPage}/>
            <Route exact path={TourismRoutes.RegisterToEventList} component={RegisterToEventListPage}/>
            <Route exact path={TourismRoutes.RegisterToEventForm} component={RegisterToEventFormPage}/>
            <Route exact path={TourismRoutes.RegisterToEventConfirmationPage} component={RegisterToEventConfirmationPage}/>
            <Route exact path={TourismRoutes.ObjectListPage} component={ObjectListPage}/>
            <Route exact path={TourismRoutes.EditObjectFormPage} component={EditObjectFormPage}/>
            <Route exact path={TourismRoutes.GameCardsPage} component={GameCardsPage}/>
            <Route exact path={TourismRoutes.SingleGamePage} component={SingleGamePage}/>

            {/* Routes for pages which controlled from CMS */}
            <Redirect exact from={'/'} to={'/' + context.active_language}/>
            <Route exact path={'/:locale'} component={PageRenderer}/>
            <Route exact path={'/:locale/:slug'} component={PageRenderer}/>

            {/* 404 page */}
            <Route component={NotFoundPage}/>

            {ROUTERS[SITE]}
        </Switch>
    );
}

export default Routing;
