import React from 'react';
import { MAIN_MENU } from "../../extra/main_menu";

import "../../styles/sidebar/main-menu.scss";


const MainMenu = () => (
	<div className="main-menu">

		{ MAIN_MENU.map(( { title, main_href, items, extra_class }, index ) => (
			<div key={ index } className={`main-menu__column ${ extra_class }`} >
				<a href={ main_href } target="_blank" className="main-menu__title"> { title } </a> 

				{ items && items.length > 0 &&

					<div className="main-menu__items">
					{ 
						items.map(({ title, href }, index) => (
							<a key={ index } href={ href } target="_blank" > { title } </a>
						))
					}
					</div>
				}
			</div>
		)) }
	</div>
)

export default MainMenu;