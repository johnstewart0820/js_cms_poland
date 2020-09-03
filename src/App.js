import React from 'react';
import { router_basename } from "./extra/API";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from './constants/UserContext'; 
import { SiteInfoContextProvider } from "./constants/SiteInfoContext";

import Routing from "./routing/Routing";
import Footer from './components/footer/Footer';
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

import "./styles/main/main.scss";
import "./styles/main/ci.scss";
import "./styles/main/contrast.scss";

const App = () => (
	<Router basename={ router_basename }>
		
		<SiteInfoContextProvider>
			<UserContextProvider>
					
				<Header />
				<Sidebar />
				<main>
					<Routing />
				</main>			
				
				<Footer />
			</UserContextProvider>
		</SiteInfoContextProvider>			
	
	</Router>
)

export default App;
