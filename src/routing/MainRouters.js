import React from 'react';
import { Route } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";

const StartPage = asyncComponent(() => import( "../pages/StartPage" ) );

const MainRouters = () => (
	<>
		<Route component={ StartPage } />
	</>
)

export default MainRouters;