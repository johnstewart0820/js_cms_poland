import React from 'react';
import { Route } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const StartPage = asyncComponent(() => import( "../pages/StartPage" ) );

const EventsPage = asyncComponent(() => import('../pages/Events/EventsPage'));
const EventSinglePage = asyncComponent( () => import( "../pages/common/EventSinglePage" ));

const NewsPage = asyncComponent( () => import( "../pages/common/NewsPage" ));
const NewsSinglePage = asyncComponent( () => import( "../pages/common/NewsSinglePage" ));

const MainRouters = () => (
	<>
		<Route exact path="/" component={ StartPage } />
		<Route exact path="/news/:id" component={ NewsSinglePage } />
		<Route exact path="/events/:id" component={ EventSinglePage } />
	</>
)

export default MainRouters;