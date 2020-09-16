import React from 'react';
import { Route } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";
import TourismRoutes from "../constants/TourismRoutes";

const MainPage = asyncComponent( () => import( "../pages/tourism/MainPage" ));
const CityPage = asyncComponent( () => import( "../pages/tourism/CityPage" ));
const NewsPage = asyncComponent( () => import( "../pages/common/NewsPage" ));
const PhotoReportsPage = asyncComponent( () => import( "../pages/common/PhotoReportsPage") );
const AccommodationsPage = asyncComponent( () => import( "../pages/common/AccommodationsPage" ));
const GastronomyPage = asyncComponent( () => import( "../pages/common/GastronomyPage") );
const WhatToVisitPage = asyncComponent( () => import( "../pages/tourism/WhatToVisitPage") );
const RegistrationPage = asyncComponent(() => import('../pages/UserPanelPages/LoginRegistration/RegistrationPage'));
const LoginPage = asyncComponent(() => import('../pages/UserPanelPages/LoginRegistration/LoginPage'));
const RegistrationConfirmationPage = asyncComponent(() => import('../pages/UserPanelPages/LoginRegistration/RegistrationConfirmationPage'));
const StadiumReservation = asyncComponent(() => import('../pages/UserPanelPages/StadiumReservation/CourtsWithCardsPage'));
const UserProfilePage = asyncComponent(() => import('../pages/UserPanelPages/UserProfile/UserProfilePage'));
const ActivateAccount = asyncComponent(() => import('../pages/UserPanelPages/LoginRegistration/ActivateAccountPage'));
const ReservationPage = asyncComponent(() => import('../pages/UserPanelPages/StadiumReservation/ReservationCalendarPage'));
const ReservationHistoryPage = asyncComponent(() => import('../pages/UserPanelPages/StadiumReservation/ReservationsHistoryListPage'));
const ReservationConfirmationPage = asyncComponent(() => import('../pages/UserPanelPages/StadiumReservation/ReservationConfirmationPage'));
const RegisterToEventList = asyncComponent(() => import('../pages/UserPanelPages/RegisterToEvent/RegisterToEventListPage'));
const RegisterToEventForm = asyncComponent(() => import('../pages/UserPanelPages/RegisterToEvent/RegisterToEventFormPage'));
const RegisterToEventConfirmationPage = asyncComponent(() => import('../pages/UserPanelPages/RegisterToEvent/RegisterToEventConfirmationPage'));
const ObjectListPage = asyncComponent(() => import('../pages/UserPanelPages/Objects/ObjectsListPage'));
const EditObjectFormPage = asyncComponent(() => import('../pages/UserPanelPages/Objects/EditObjectFormPage'));
const GameCardsPage = asyncComponent(() => import('../pages/UserPanelPages/Game/GameCardsPage'));

const EventSinglePage = asyncComponent( () => import( "../pages/common/EventSinglePage" ));
const NewsSinglePage = asyncComponent( () => import( "../pages/common/NewsSinglePage" ));
const EventsPage = asyncComponent(() => import('../pages/Events/EventsPage'));
const AttractionsPage = asyncComponent(() => import('../pages/common/AttractionsPage'));
const DiscountCardsPage = asyncComponent(() => import('../pages/common/DiscountCardsPage'));
const PlanerListPage = asyncComponent(() => import('../pages/common/PlanerListPage'));


const TourismRouters = () => (
	<>
		<Route exact path={TourismRoutes.Main} component={ MainPage } />
		<Route exact path={TourismRoutes.City} component={ CityPage } />
		<Route exact path={TourismRoutes.News} component={ NewsPage } />
		<Route exact path={TourismRoutes.PhotoReports} component={ PhotoReportsPage } />
		<Route exact path={TourismRoutes.Accommodations} component={ AccommodationsPage } />
		<Route exact path={TourismRoutes.Gastronomy} component={ GastronomyPage } />
		<Route exact path={TourismRoutes.WhatToVisit} component={ WhatToVisitPage } />
		<Route exact path={TourismRoutes.Login} component={ LoginPage } />
		<Route exact path={TourismRoutes.Registration} component={ RegistrationPage } />
		<Route exact path={TourismRoutes.RegistrationConfirmation} component={ RegistrationConfirmationPage } />
		<Route exact path={TourismRoutes.ActivateAccount} component={ ActivateAccount }/>
		<Route exact path={TourismRoutes.UserProfile} component={ UserProfilePage } />
		<Route exact path={TourismRoutes.StadiumReservation} component={ StadiumReservation }/>
		<Route exact path={TourismRoutes.ReservationConfirmationPage} component={ ReservationConfirmationPage }/>
		<Route exact path={TourismRoutes.Reservation()} component={ ReservationPage }/>
		<Route exact path={TourismRoutes.SingleEvent()} component={ EventSinglePage } />
		<Route exact path={TourismRoutes.SingleNews()} component={ NewsSinglePage } />
		<Route exact path={TourismRoutes.ReservationHistoryPage} component={ReservationHistoryPage}/>
		<Route exact path={TourismRoutes.RegisterToEventList} component={RegisterToEventList}/>
		<Route exact path={TourismRoutes.RegisterToEventForm} component={RegisterToEventForm}/>
		<Route exact path={TourismRoutes.RegisterToEventConfirmationPage} component={RegisterToEventConfirmationPage}/>
		<Route exact path={TourismRoutes.ObjectListPage} component={ObjectListPage}/>
		<Route exact path={TourismRoutes.EditObjectFormPage} component={EditObjectFormPage}/>
		<Route exact path={TourismRoutes.GameCardsPage} component={GameCardsPage}/>
		<Route exact path={TourismRoutes.Events} component={EventsPage}/>
		<Route exact path={TourismRoutes.AttractionsPage} component={AttractionsPage}/>
		<Route exact path={TourismRoutes.DiscountCardsPage} component={DiscountCardsPage}/>
		<Route exact path={TourismRoutes.PlanerListPage} component={PlanerListPage}/>
	</>
)


export default TourismRouters;