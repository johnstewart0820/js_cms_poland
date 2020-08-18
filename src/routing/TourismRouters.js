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
const RegistrationPage = asyncComponent(() => import('../pages/LoginRegistration/RegistrationPage'));
const LoginPage = asyncComponent(() => import('../pages/LoginRegistration/LoginPage'));
const RegistrationConfirmationPage = asyncComponent(() => import('../pages/LoginRegistration/RegistrationConfirmationPage'));
const StadiumReservation = asyncComponent(() => import('../pages/StadiumReservation/CourtsWithCardsPage'));
const UserProfilePage = asyncComponent(() => import('../pages/UserProfile/UserProfilePage'));
const ActivateAccount = asyncComponent(() => import('../pages/LoginRegistration/ActivateAccountPage'));
const ReservationPage = asyncComponent(() => import('../pages/StadiumReservation/ReservationCalendarPage'));
const ReservationHistoryPage = asyncComponent(() => import('../pages/StadiumReservation/ReservationsHistoryListPage'));
const ReservationConfirmationPage = asyncComponent(() => import('../pages/StadiumReservation/ReservationConfirmationPage'));

const EventSinglePage = asyncComponent( () => import( "../pages/common/EventSinglePage" ));
const NewsSinglePage = asyncComponent( () => import( "../pages/common/NewsSinglePage" ));


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
	</>
)


export default TourismRouters;