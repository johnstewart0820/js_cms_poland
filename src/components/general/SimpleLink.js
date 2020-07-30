import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SimpleLink = ({ svg, to, href = "#", label, target, hidden_text, extra_classes, onClick }) => (
	to 
	? (
		<Link to={ to }> 
			{ svg }
			<span> { label } </span>
			<span className="d-none"> { hidden_text } </span>
		</Link>
	)
	: (
		<a 
			className={` ${extra_classes || ""} `}
			href={ href }
			target={ target }
			onClick={ onClick }	
		>
			{ svg }
			<span> { label } </span>
			<span className="d-none"> { hidden_text } </span>
		</a>
	)
)

SimpleLink.propTypes = { }

export default SimpleLink;