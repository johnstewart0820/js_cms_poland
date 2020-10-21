import React, { useState, useEffect, useContext } from 'react';

import HeaderActions from '../header/HeaderActions';
import SiteInfoContext from '../../constants/SiteInfoContext';

import "../../styles/sidebar/main-menu.scss";

let MAIN_MENU;

const MainMenu = props => {

	const site_info_context = useContext( SiteInfoContext );
	const [ open_menu, setOpenMenu ] = useState( null );
	

	useEffect(() => {

		if ( site_info_context?.toggle_menu?.structure ) {
		
			const { structure } = site_info_context.toggle_menu;

			if ( !Array.isArray( structure )) return;

			MAIN_MENU = structure.map(({ item, subitems }, index ) => {

				const items = subitems.map(({ item }) => ({ title: item.name, href: item.url }));
				const extra_class = ["tourism", "culture", "sport", "main", "stay-updated" ][ index ];

				return {
					title: item.name,
					main_href: item.url,
					items,
					extra_class
				}
			}) 
		} 


	}, [ site_info_context.toggle_menu ])


	const toggleMobileMenu = ( e, index ) => {
		e.preventDefault();
		setOpenMenu( open_menu === index ? -1 : index );
	}


	return (
		<div className={`main-menu ${ props.extra_classes || "" }`}>

			{ MAIN_MENU && !!MAIN_MENU.length &&
				MAIN_MENU.map(( { title, main_href, items, extra_class }, index ) => {

				const column_classes = [ "main-menu__column", extra_class || "", open_menu === index ? "mobile-open" : "" ];

				return (
					<div key={ index } className={ column_classes.join(" ") } >
						<a href={ main_href } className="main-menu__title" rel={'noopener noreferrer'}> 
							
							{ items && !!items.length && <strong onClick={ e => toggleMobileMenu( e, index ) }> &#62; </strong> }
							<span> { title } </span>
						</a>
	
						{ items && !!items.length &&
							<div className="main-menu__items">
								{ items.map(({ title, href }, index) => (
									<a key={ index } href={ href } rel={'noopener noreferrer'}> { title } </a>
								)) }
							</div>
						}
					</div>
				) 
			}) }

			<HeaderActions />
		</div>
	)
}

export default MainMenu;