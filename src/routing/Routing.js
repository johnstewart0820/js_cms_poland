import React from 'react';
import {Switch, Route} from "react-router-dom";

import {SITE} from "../extra/site_settings.js";

import MainRouters from "./MainRouters";
import TourismRouters from "./TourismRouters";
import PageRenderer from "../extra/PageRenderer";
import NotFoundPage from "../pages/NotFoundPage";

const ROUTERS = {
    "MAIN": <MainRouters/>,
    "TOURISM": <TourismRouters/>
}

const Routing = () => (
    <Switch>
        <Route exact path={'/error'} component={NotFoundPage}/>
		<Route exact path={'/'} component={PageRenderer}/>
		<Route exact path={'/page/:pageId'} component={PageRenderer}/>
        <Route exact path={'/:slug'} component={PageRenderer}/>
        {ROUTERS[SITE]}
    </Switch>
);

export default Routing;
