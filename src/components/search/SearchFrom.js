import React from 'react';
import { SearchIcon } from "../../svg/icons";
import "../../styles/search/search-form.scss";

const SearchFrom = () => (
	<form method="GET" className="search-form">
		<input name="q" type="text" placeholder="Szukaj" />
		<SearchIcon />
	</form>
)

SearchFrom.propTypes = { }

export default SearchFrom;