import React from 'react';
import { Route } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const MainPage = asyncComponent( () => import( "../pages/tourism/MainPage" ));
const CityPage = asyncComponent( () => import( "../pages/tourism/CityPage" ));
const NewsPage = asyncComponent( () => import( "../pages/common/NewsPage" ));
const PhotoReportsPage = asyncComponent( () => import( "../pages/common/PhotoReportsPage") );
const AccommodationsPage = asyncComponent( () => import( "../pages/common/AccommodationsPage" ));
const GastronomyPage = asyncComponent( () => import( "../pages/common/GastronomyPage") );
const WhatToVisitPage = asyncComponent( () => import( "../pages/tourism/WhatToVisitPage") );
const RegistrationPage = asyncComponent(() => import('../pages/LoginRegistrationPages/RegistrationPage'));
const LoginPage = asyncComponent(() => import('../pages/LoginRegistrationPages/LoginPage'));
const RegistrationConfirmationPage = asyncComponent(() => import('../pages/LoginRegistrationPages/RegistrationConfirmationPage'));
const StadiumReservation = asyncComponent(() => import('../pages/StadiumReservationPages/StadiumReservation'));
const UserProfilePage = asyncComponent(() => import('../pages/UserProfile/UserProfilePage'));
const ActivateAccount = asyncComponent(() => import('../pages/LoginRegistrationPages/ActivateAccount'));
const ReservationPage = asyncComponent(() => import('../pages/StadiumReservationPages/ReservationPage'));
const NotificationPage = asyncComponent(() => import('../components/confirm/NotificationPage'));

const EventSinglePage = asyncComponent( () => import( "../pages/common/EventSinglePage" ));
const NewsSinglePage = asyncComponent( () => import( "../pages/common/NewsSinglePage" ));


const TourismRouters = () => (
	<>
		<Route exact path="/" component={ MainPage } />
		<Route exact path="/city" component={ CityPage } />
		<Route exact path="/news" component={ NewsPage } />
		<Route exact path="/photo-reports" component={ PhotoReportsPage } />
		<Route exact path="/accommodations" component={ AccommodationsPage } />
		<Route exact path="/gastronomy" component={ GastronomyPage } />
		<Route exact path="/what-to-visit" component={ WhatToVisitPage } />

		{/*Login&Registration routes*/}
		<Route exact path="/login" component={ LoginPage } />
		<Route exact path="/registration" component={ RegistrationPage } />
		<Route exact path="/confirm" component={ RegistrationConfirmationPage } />
		<Route exact path="/activate-account" component={ ActivateAccount }/>

		{/*Boiska reservation*/}
		<Route exact path="/profile" component={ UserProfilePage } />
		<Route exact path="/stadium-reservation" component={ StadiumReservation }/>
		<Route exact path="/reservation" component={ ReservationPage }/>
		<Route exact path="/reservation-confirm" component={ NotificationPage }/>

		<Route exact path="/events/:id" component={ EventSinglePage } />
		<Route exact path="/news/:id" component={ NewsSinglePage } />

	</>
)


export default TourismRouters;