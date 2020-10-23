import React, { useEffect } from 'react';
import { loadScript } from '../../extra/functions';
import { search_panel_id } from '../../extra/search-panel';

const SearchPanel = () => {

	useEffect(() => {
		loadScript("https://www.e-podroznik.pl/public/jslib.do", document.querySelector(`#${ search_panel_id }`) )
	}, [])

	return (
		<div id={ search_panel_id } style={{ display: "none" }}>
			<script type="text/x-epodroznik-module" data-module-name="ConnectionsSearcher" id="epSearcher"></script>
			<script type="text/x-epodroznik-module" data-module-name="SearchingResults" id="SearchingResults"></script>
		</div>
	)
}

export default SearchPanel;