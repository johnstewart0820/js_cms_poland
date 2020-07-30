import React from 'react';
import { Route } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const MainPage = asyncComponent( () => import( "../pages/tourism/MainPage" ));
const CityPage = asyncComponent( () => import( "../pages/tourism/CityPage" ));
const NewsPage = asyncComponent( () => import( "../pages/common/NewsPage" ));
const PhotoReportsPage = asyncComponent( () => import( "../pages/common/PhotoReportsPage") );
const AccommodationsPage = asyncComponent( () => import( "../pages/common/AccommodationsPage" ));
const GastronomyPage = asyncComponent( () => import( "../pages/common/GastronomyPage") );

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

		<Route exact path="/events/:id" component={ EventSinglePage } />
		<Route exact path="/news/:id" component={ NewsSinglePage } />

	</>
)


export default TourismRouters;