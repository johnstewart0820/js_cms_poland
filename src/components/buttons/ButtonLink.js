import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { isFunction } from "../../extra/functions";

import "../../styles/buttons/button-link.scss";

const ButtonLink = ({ children, path, href = "#", target, extra_classes, onClick }) => (
	children 
	? path
		? (
			<Link to={ path } className={ `button-link ${ extra_classes || "" }` }> 
				{ children }
			</Link>
		)
		: (
			<a 
				href={ href }
				target={ target }
				className={ `button-link ${ extra_classes || "" }` }
				onClick={ 
					onClick 
					? (e) => { 
						e.preventDefault();
						if( isFunction( onClick ) ) onClick();
					}
					: null				
				}
			>

				{ children } 
			</a>
		)
	: null
)

ButtonLink.propTypes = {
	href: PropTypes.string,
	path: PropTypes.string,
	extra_classes: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func
}

export default ButtonLink;