import React, { useState, useMemo, useEffect, useContext } from 'react';

import HeaderActions from '../header/HeaderActions';
import SiteInfoContext from '../../constants/SiteInfoContext';

import "../../styles/sidebar/main-menu.scss";


const MainMenu = props => {

	const site_info_context = useContext( SiteInfoContext );
	const [ open_menu, setOpenMenu ] = useState( null );
	

	const MAIN_MENU = useMemo(() => {
		
		if ( site_info_context?.toggle_menu?.structure ) {
		
			const { structure } = site_info_context.toggle_menu;

			if ( !Array.isArray( structure )) return null; 

			return structure.map(({ item, subitems }, index ) => {

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

		return null;

	}, [ site_info_context.toggle_menu ]);


	const toggleMobileMenu = ( e, index ) => {
		e.preventDefault();
		setOpenMenu( open_menu === index ? -1 : index );
	}


	return (
		<div className={`main-menu ${ props.extra_classes || "" }`}>

			{ MAIN_MENU && !!MAIN_MENU.length &&
				MAIN_MENU.map(( { title, main_href, items, extra_class }, index ) => {

					const is_open = open_menu === index;
					const column_classes = [ "main-menu__column", extra_class || "", is_open ? "mobile-open" : "" ];
					// &#x21d2;

					const has_items = !!items && !!items.length;

					return (
						<div key={ index } className={ column_classes.join(" ") } >
							<a href={ main_href } className="main-menu__title" rel={'noopener noreferrer'}> 
								
								{ has_items && <strong onClick={ e => toggleMobileMenu( e, index ) }> &#62;  </strong> }
								<span> { title } </span>
							</a>
		
							{ has_items &&
								<div className="main-menu__items">
									{ items.map(({ title, href }, index) => (
										<a key={ index } href={ href } rel={'noopener noreferrer'}> { title } </a>
									)) }
								</div>
							}
						</div>
					) 
			}) }

			<HeaderActions searchSubmitCallback={ props.searchSubmitCallback }/>
		</div>
	)
}

export default MainMenu;