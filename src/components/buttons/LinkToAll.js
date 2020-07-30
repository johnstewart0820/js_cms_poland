import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const LinkToAll = ({ path, href, label = "ZOBACZ WSZYSTKIE" }) => (
	path 
	? (
		<Link className="link-to-all" to={ path }> { label } </Link>
	)
	: href 
		? (
			<a className="link-to-all" href={ href } > { label } </a>
		) 
		: null 
)

LinkToAll.propTypes = {
	path: PropTypes.string,
	href: PropTypes.string,
	label: PropTypes.string
}

export default LinkToAll;