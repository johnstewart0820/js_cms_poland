import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from "../../svg/icons";
import "../../styles/search/search-form.scss";

const SearchFrom = (props) => (
	<form method="GET" className="search-form">
		<input name="q" type="text" placeholder="Szukaj" />
		<SearchIcon />
	</form>
)

SearchFrom.propTypes = { }

export default SearchFrom;