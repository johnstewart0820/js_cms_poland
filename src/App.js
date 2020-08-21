import React, { Component } from 'react';
import { router_basename } from "./extra/API";
import { BrowserRouter as Router } from "react-router-dom";
import {UserContextProvider} from './constants/UserContext';
import Routing from "./routing/Routing";
import Footer from './components/footer/Footer';
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";


import "./styles/main/main.scss";
import "./styles/main/ci.scss";
import "./styles/main/contrast.scss";

import { isContrastThemeOn, turnOnContrastTheme } from "./extra/theme";
import { SITE } from "./extra/site_settings";


/* FIXME move to locale switcher */
import moment from 'moment';
import 'moment/locale/pl';
moment().locale('pl');

class App extends Component {

	componentDidMount(){
		this.checkTheme();
	}


	checkTheme = () => {
		if( isContrastThemeOn() ) turnOnContrastTheme()
	}

	render() {
		return (
			<>
				<Router basename={ router_basename }>

					<UserContextProvider>
						<Header type={ SITE } />
						<Sidebar />
						<main>
							<Routing />
						</main>
					</UserContextProvider>

				  <Footer />
	  
			  	</Router>
			</>
		 );
	}
}

export default App;
