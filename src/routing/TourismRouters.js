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
const EventSinglePage = asyncComponent( () => import( "../pages/common/EventSinglePage" ));
const NewsSinglePage = asyncComponent( () => import( "../pages/common/NewsSinglePage" ));
const EventsPage = asyncComponent(() => import('../pages/Events/EventsPage'));
const AttractionsPage = asyncComponent(() => import('../pages/common/AttractionsPage'));
const DiscountCardsPage = asyncComponent(() => import('../pages/common/DiscountCardsPage'));


const TourismRouters = () => (
	<>
		<Route exact path={TourismRoutes.Main} component={ MainPage } />
		<Route exact path={TourismRoutes.City} component={ CityPage } />
		<Route exact path={TourismRoutes.News} component={ NewsPage } />
		<Route exact path={TourismRoutes.PhotoReports} component={ PhotoReportsPage } />
		<Route exact path={TourismRoutes.Accommodations} component={ AccommodationsPage } />
		<Route exact path={TourismRoutes.Gastronomy} component={ GastronomyPage } />
		<Route exact path={TourismRoutes.WhatToVisit} component={ WhatToVisitPage } />
		<Route exact path={TourismRoutes.SingleEvent()} component={ EventSinglePage } />
		<Route exact path={TourismRoutes.SingleNews()} component={ NewsSinglePage } />
		<Route exact path={TourismRoutes.Events} component={EventsPage}/>
		<Route exact path={TourismRoutes.AttractionsPage} component={AttractionsPage}/>
		<Route exact path={TourismRoutes.DiscountCardsPage} component={DiscountCardsPage}/>
	</>
)


export default TourismRouters;