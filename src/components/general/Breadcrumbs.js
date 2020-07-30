import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "../../styles/general/breadcrumbs.scss";

import { main_url } from "../../extra/main_menu";

const start_link = { label: "Start", href: main_url };

const Breadcrumbs = ({ breadcrumbs, extra_classes }) => (
	<div className={`breadcrumbs ${ extra_classes || "" }`}>
		
		<div className="container">
			<div className="breadcrumbs__items">
				{ breadcrumbs && !!breadcrumbs.length && 
					[ start_link, ...breadcrumbs ].map(({ label, href, to }, index) => (
						href 
						? <a key={ index } href={ href } > { label } </a>
						: to 
							? <Link key={ index } to={ to } > { label } </Link>
							:	<div key={ index } > { label } </div>	
				))}
			</div>
		</div>
	</div>
)

Breadcrumbs.propTypes = { 
	breadcrumbs: PropTypes.array.isRequired,
	extra_classes: PropTypes.string
}

export default Breadcrumbs;