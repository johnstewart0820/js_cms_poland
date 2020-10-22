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
import { search_panel_id } from "./extra/search-panel";
import { PlanerContextProvider } from "./constants/PlanerContext";
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

								<div id={ search_panel_id } style={{ display: "none" }}>
									<script type="text/x-epodroznik-module" data-module-name="ConnectionsSearcher" id="epSearcher"></script>
									<script type="text/x-epodroznik-module" data-module-name="SearchingResults" id="SearchingResults"></script>
								</div>

                        <PlanerButton to={TourismRoutes.PlanerListPage}/>
                        <main>
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
