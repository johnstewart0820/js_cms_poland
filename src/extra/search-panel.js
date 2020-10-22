export const search_panel_id= "search-panel-EP";

export const toggleSearchPanel = () => {		
	const search_panel = document.querySelector(`#${ search_panel_id }`);
	const current_display = search_panel.style.display;

	const next_display = current_display === "none" ? "block" : "none";
	search_panel.style.cssText = `display:${ next_display }`;		
}