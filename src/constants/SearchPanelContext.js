import React, { useEffect } from 'react';



const SearchPanelContext = React.createContext( null );

export const search_panel_id= "search-panel-EP";

export const SearchPanelContextProvider = props => {

	useEffect(() => {
		const loadScript = src => {
			
			const script = document.createElement('script');
			script.type = "text/javascript";
			script.async = true;
			script.src = src;

			const search_panel = document.querySelector(`#${search_panel_id}`);
			search_panel.appendChild( script );
		}

		loadScript("https://www.e-podroznik.pl/public/jslib.do");
	}, []);


	const toggleSearchPanel = () => {
		
		const search_panel = document.querySelector(`#${search_panel_id}`);
		const current_display = search_panel.style.display;

		const next_display = current_display === "none" ? "block" : "none";
		search_panel.style.cssText = `display:${ next_display }`;		
	}


	return (
		<SearchPanelContext.Provider value={{ toggleSearchPanel }}>
			{ props.children }
		</SearchPanelContext.Provider>
	)
}

export default SearchPanelContext;
