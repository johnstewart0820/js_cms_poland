import React, { useState } from 'react';
import { MAIN_MENU } from "../../extra/main_menu";

import "../../styles/sidebar/main-menu.scss";


const MainMenu = () => {

	const [ open_menu, setOpenMenu ] = useState( null );
	
	function toggleMobileMenu ( e, index ) {
		e.preventDefault();
		setOpenMenu( open_menu === index ? -1 : index );
	}

	return (
		<div className="main-menu">

			{ MAIN_MENU.map(( { title, main_href, items, extra_class }, index ) => {

				const column_classes = [ "main-menu__column", extra_class || "", open_menu === index ? "mobile-open" : "" ];

				return (
					<div key={ index } className={ column_classes.join(" ") } >
						<a href={ main_href } target="_blank" className="main-menu__title" rel={'noopener noreferrer'}> 
							
							{ items && !!items.length && <strong onClick={ e => toggleMobileMenu( e, index ) }> &#62; </strong> }
							<span> { title } </span>
						</a>
	
						{ items && !!items.length &&
							<div className="main-menu__items">
								{ items.map(({ title, href }, index) => (
									<a key={ index } href={ href } target="_blank" rel={'noopener noreferrer'}> { title } </a>
								)) }
							</div>
						}
					</div>
				) 
			}) }
		</div>
	)
}

export default MainMenu;