import React from 'react';
import PropTypes from 'prop-types';
import {isFunction} from "../../extra/functions";

import "../../styles/buttons/button-link.scss";
import SelectiveLink from "../../extra/SelectiveLink";

const ButtonLink = ({ children, path, href = "#", target, extra_classes, onClick }) => (
	children 
	? path
		? (
            <SelectiveLink to={path} className={`button-link ${extra_classes || ""}`}>
                {children}
            </SelectiveLink>
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