import React from 'react';
import { Switch } from "react-router-dom";

import { SITE } from "../extra/site_settings.js";

import MainRouters from "./MainRouters";
import TourismRouters from "./TourismRouters";

const ROUTERS = {
	"MAIN": <MainRouters/>,
	"TOURISM": <TourismRouters/>
}

const Routing = () => (
	<Switch>
		
		{ ROUTERS [ SITE ] }

	</Switch>
)

export default Routing;