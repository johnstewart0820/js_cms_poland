import React, { Component } from 'react';
import { API, router_basename } from "./extra/API";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from './constants/UserContext'; 

import { isContrastThemeOn, turnOnContrastTheme } from "./extra/theme";
import { SITE, SITES_DOMAIN } from "./extra/site_settings";

import Routing from "./routing/Routing";
import Footer from './components/footer/Footer';
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";


import "./styles/main/main.scss";
import "./styles/main/ci.scss";
import "./styles/main/contrast.scss";



/* FIXME move to locale switcher */
import moment from 'moment';
import 'moment/locale/pl';
moment().locale('pl');

class App extends Component {

	state = {
		languages: ["pl"],
		active_language: "pl",
		header_menu: [],

		footer_address: ""
	}

	componentDidMount(){
		this.checkTheme();
		this.getSiteInfo();
	}


	getSiteInfo = () => {
		API.get(`sites/getInfo?domain=${ SITES_DOMAIN[ SITE ] }`)
		.then( res => {

			const { info } = res.data;
			// console.log( info );

			const languages = info.languages ? info.languages.split(",") : ["pl"];
			const { defaultLanguage } = info;

			const widgets = info?.template?.layout?.["home-page"]?.widgets;
			// console.log( widgets );
			
			const header_menu_structure = widgets?.["top-menu"]?.elements?.[0]?.menu?.structure;
			const footer_address = widgets?.["footer-contact"]?.elements?.[0]?.content;

			const footer_subpage_link1 = widgets?.["bottom-col-1"]?.elements?.[0]?.content;
			const footer_subpage_link2 = widgets?.["bottom-col-2"]?.elements?.[0]?.content;
			const footer_subpage_link3 = widgets?.["bottom-col-3"]?.elements?.[0]?.content;
			const footer_subpage_link4 = widgets?.["bottom-col-4"]?.elements?.[0]?.content;

			const footer_subpage_links = [ footer_subpage_link1, footer_subpage_link2, footer_subpage_link3, footer_subpage_link4 ];
			const footer_links = widgets?.["footer-links"]?.elements?.[0]?.content;

			const header_menu = 
				header_menu_structure 
				? header_menu_structure.map(({ item }) => (
					{ label: item.name, path: item.url || "/" }
				))
				: [];

			this.setState({ languages, active_language: defaultLanguage, header_menu, footer_address, footer_subpage_links, footer_links })
		})
		.catch( err => {} )
	}


	checkTheme = () => { if ( isContrastThemeOn() ) turnOnContrastTheme(); }


	changeLanguage = language => this.setState({ active_language: language });


	render() {

		const header_props = {
			type: SITE,
			languages: this.state.languages,
			active_language: this.state.active_language,
			header_menu: this.state.header_menu,
			changeLanguage: this.changeLanguage
		};

		const footers_props = {
			address: this.state.footer_address,
			footer_subpage_links: this.state.footer_subpage_links,
			footer_links : this.state.footer_links
		}

		return (
			<>
				<Router basename={ router_basename }>

					<UserContextProvider>
						<Header {...header_props } />
						<Sidebar />
						<main>
							<Routing />
						</main>
					</UserContextProvider>

				  <Footer {...footers_props } />

			  	</Router>
			</>
		 );
	}
}

export default App;
