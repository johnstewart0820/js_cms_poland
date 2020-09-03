import React, { Component } from 'react';
import { API } from "../extra/API";

import { SITE, SITES_DOMAIN } from "../extra/site_settings";
import { isContrastThemeOn, turnOnContrastTheme } from "../extra/theme";

import FullPageLoader from '../components/general/FullPageLoader';
import LocalStorage from "./LocalStorage";

import moment from 'moment';
import 'moment/locale/pl';
import 'moment/locale/cs';
import 'moment/locale/de';

const SiteInfoContext = React.createContext(null);
const SiteInfoContextConsumer = SiteInfoContext.Consumer;

const StoredLocale = localStorage.getItem(LocalStorage.Locale);

class SiteInfoContextProvider extends Component{
	state = {
		site_info_loading: true,
		active_language: StoredLocale || 'pl',
	};

	componentDidMount () {
		if (!StoredLocale)
			localStorage.setItem(LocalStorage.Locale, this.state.active_language);
		moment().locale(this.state.active_language);
		this.checkTheme();
		this.getSiteInfo();
	}


	checkTheme = () => { if ( isContrastThemeOn() ) turnOnContrastTheme(); }


	getSiteInfo = () => {

		this.setState({ site_info_loading: true });

		const { active_language } = this.state;

		const params = {
			domain: SITES_DOMAIN[ SITE ],
			lang: active_language
		}

		API.get(`sites/getInfo`, { params })
		.then( res => {

			const { info } = res.data;
			// console.log( info );

			const languages = 
				info.languages && info.languages !== active_language  
					? info.languages.split(",") 
					: [];

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

			this.setState({ 	
				site_info: info, 
				site_info_loading: false, 
				languages, 
				header_menu, 
				footer_address, 
				footer_subpage_links, 
				footer_links 
			})
		})
		.catch( err => {} )
	}


	changeLanguage = language => {
		localStorage.setItem(LocalStorage.Locale, language);
		moment().locale(language);
		this.setState({active_language: language}, this.getSiteInfo);
	};


	render(){

		const { children } = this.props;

		return(
			<SiteInfoContext.Provider value={{
				...this.state,
				changeLanguage: this.changeLanguage	
			}} >
				<FullPageLoader>
					{ children }
				</FullPageLoader>
			</SiteInfoContext.Provider>
		)
	}
};


export default SiteInfoContext;
export { SiteInfoContextProvider, SiteInfoContextConsumer };