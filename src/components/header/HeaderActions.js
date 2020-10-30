import React, { useState } from 'react';

import SearchFrom from "../search/SearchFrom";
import SimpleLink from "../general/SimpleLink";
import { EyeIcon, UnderlineIcon, BipIcon, SearchIcon } from "../../svg/icons";

import { toggleContrastVersion, toggleUnderlineLinks } from "../../extra/theme";
import "../../styles/header/header-actions.scss";
import { isFunction } from '../../extra/functions';

const changeFontSize = e => {
	e.preventDefault();

	let
		target = e.target,
		body = document.body,
		fontSize = parseInt(window.getComputedStyle(body).fontSize.replace("px", "")),
		fontAction;	

	if( target.tagName === 'SPAN' ) {
		target = target.parentElement;
	
		fontAction = target.innerText === "A-" ? "less" : "more";

		if( fontAction === 'less' && fontSize > 10 ) fontSize -= 1;
		if( fontAction === 'more' && fontSize < 18 ) fontSize += 1;
	
		fontSize += "px";
		body.style.fontSize = fontSize;
	}
}

const header_links = [
	{
		svg: <UnderlineIcon />,
		extra_classes: "underline",
		hidden_text: "underline links",
		onClick: toggleUnderlineLinks
	},
	{ 
		svg: <EyeIcon />,
		extra_classes: "contrast",
		hidden_text: "contrast switcher",
		onClick: toggleContrastVersion
	},
	{
		hidden_text: "font size decrease",
		label: "A-",
		extra_classes: "font-size-switch",
		onClick: changeFontSize
	},
	{
		hidden_text: "font size increase",
		label: "A+",
		extra_classes: "font-size-switch",
		onClick: changeFontSize
	},
	{
		svg: <BipIcon />,
		href: "https://ustron.bip.info.pl/",
		target: "_blank",
		extra_classes: "bip",
		hidden_text: "bip"
	},
	{

		svg: <SearchIcon />,
		hidden_text: "search",
		extra_classes: "search has-overlay link",
		type: "search"
	}
];



export default function HeaderActions ( props ) {

	const [ show_search, setShowSearch ] = useState( false );

	const toggleSearch = e => {
		e.preventDefault();
		setShowSearch( !show_search )
	}

	return (
			<div className="header-actions">
				{ header_links.map(( item, index ) => {
					
					const { extra_classes, type } = item;
					const extra_classes_arr = [ "link", extra_classes, type === "search" && show_search && "active" ];

					return (
						<SimpleLink 
							key={ index }
							{...item}
							extra_classes={ extra_classes_arr.join(" ") }
							onClick={ type === "search" ? toggleSearch : item.onClick || null }
						/>
					)} 
				)}

				{ show_search && 
					<SearchFrom 
						submitCallback={ 
							() => { 
								setShowSearch( false )
								if ( isFunction( props.searchSubmitCallback )) props.searchSubmitCallback();
							}
						}/> 
					}
			</div>
	)
}
