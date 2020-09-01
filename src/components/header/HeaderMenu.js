import React from 'react';
import { Link } from "react-router-dom";

import { SiteInfoContextConsumer } from "../../constants/SiteInfoContext";

const HeaderMenu = () => (
	<SiteInfoContextConsumer>
		{ ({ header_menu }) => (
			<>
				{ header_menu && !!header_menu.length &&
					<div className="header-main__menu">
						{ header_menu.map(({ path, label }, index ) => (
							<Link key={ index } to={ path }> { label }  </Link>
						)) }
					</div>
				}
			</>
		)}
	</SiteInfoContextConsumer>
)

export default HeaderMenu;