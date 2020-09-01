import React, { Component } from 'react';
import { Link } from "react-router-dom";

import HeaderMenu from "./HeaderMenu";
import SimpleLink from "../general/SimpleLink";
import SearchFrom from "../search/SearchFrom";
import AuthPanel from "../auth/AuthPanel";
import LanguageSwitcher from "../general/LanguageSwitcher";

import MainLogo from "../../svg/components/MainLogo";
import { EyeIcon, UnderlineIcon, BipIcon, SearchIcon, UserIcon } from "../../svg/icons";
import { toggleContrastVersion, toggleUnderlineLinks } from "../../extra/theme";
import { SITE } from "../../extra/site_settings";
import UserContext from "../../constants/UserContext";


import "../../styles/header/header.scss";

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
	}
]

export default class Header extends Component {
	
	static contextType = UserContext;

	state = {
		show_search: false,
		show_auth: false
	}


	toggleSearch = e => {
		e.preventDefault();
		this.setState({ show_search: !this.state.show_search  });
	}


	toggleAuth = e => {
		e.preventDefault();
		this.setState({ show_auth: !this.state.show_auth });
	}


	getHeaderLinks = () => (
		header_links.map(( item, index ) => (
			<SimpleLink 
				key={ index }
				{...item}
				extra_classes={`header__link ${ item.extra_classes || "" }`}
			/>
		))
	)


	getHeaderActions = () => {
		const actions = [
			{
				svg: <SearchIcon />,
				hidden_text: "search",
				extra_classes: `search has-overlay ${this.state.show_search ? "active" : "" }`,
				onClick: this.toggleSearch
			},
			{
				component: LanguageSwitcher,
				props: {	extra_classes:"header__link" },
			},
			{
				svg: <UserIcon />,
				extra_classes: `has-overlay ${this.state.show_auth ? "active" : ""} `,
				hidden_text: "login / logout",
				onClick: this.context.id ? () => (window.location.href='/profile') : this.toggleAuth
			}
		]


		return actions.map(( item, index ) => (
			item.component 
			? (
				<item.component key={ index } {...item.props } />
			)
			: (
				<SimpleLink 
					key={ index }
					{...item}
					extra_classes={`header__link ${ item.extra_classes || "" }`}
				/>
			)
		))
	}


	getHeaderSubtitle = () => {
		if( !SITE ) return null;
		
		const subtitles = {
			"TOURISM": "Portal Turystyczny",
			"SPORT": "Sport",
			"CULTURE": "Kultura",
		}

		return subtitles[ SITE ];
	}

	render() {
		
		const { show_search, show_auth } = this.state;

		const header_links = this.getHeaderLinks();
		const header_actions = this.getHeaderActions();
		const header_subtitle = this.getHeaderSubtitle();

		const header_classes = ["header"];
		if( SITE !== "MAIN" ) header_classes.push("has-menu");

		return (
			<header id="header" className={ header_classes.join(" ") }>
				<Link to="/" className="header-logo">
					<MainLogo />
					<span> { header_subtitle }  </span>
				</Link>

				<div className="header-main">
					<div className="header-main__top">
						{ header_links }
						{ header_actions }
					</div>

					<HeaderMenu />
				</div>

				{ show_search && <SearchFrom /> }
				{ !this.context.id && show_auth && <AuthPanel /> }
			</header>
		)
	}
}

