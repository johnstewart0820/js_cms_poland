import React from 'react';
import {router_basename} from "./extra/API";
import {BrowserRouter as Router} from "react-router-dom";
import {UserContextProvider} from './constants/UserContext';
import {SiteInfoContextProvider} from "./constants/SiteInfoContext";

import Routing from "./routing/Routing";
import Footer from './components/footer/Footer';
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

import "./styles/main/main.scss";
import "./styles/main/ci.scss";
import "./styles/main/contrast.scss";
import {PlanerContextProvider} from "./constants/PlanerContext";
import TourismRoutes from "./constants/TourismRoutes";
import PlanerButton from "./components/buttons/PlanerButton";
import ScrollToTop from "./extra/ScrollToTop";
import ErrorHandler from "./extra/ErrorHandler";

const App = () => (
    <Router basename={router_basename}>
        <SiteInfoContextProvider>
            <UserContextProvider>
                <PlanerContextProvider>
                    <ScrollToTop>
                        <Header/>
                        <Sidebar/>
                        <PlanerButton to={TourismRoutes.PlanerListPage}/>
                        <main>
                            <script type="text/x-epodroznik-module" data-module-name="SearchingResults" id="SearchingResults"/>
                            <script type="text/x-epodroznik-module" data-module-name="ConnectionsSearcher" id="epSearcher"/>
                            <ErrorHandler>
                                <Routing/>
                            </ErrorHandler>
                        </main>
                        <Footer/>
                    </ScrollToTop>
                </PlanerContextProvider>
            </UserContextProvider>
        </SiteInfoContextProvider>
    </Router>
);

export default App;
