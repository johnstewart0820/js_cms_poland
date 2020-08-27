import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import SimpleLink from "../general/SimpleLink";
import SearchFrom from "../search/SearchFrom";
import AuthPanel from "../auth/AuthPanel";
import LanguageSwitcher from "../general/LanguageSwitcher";

import MainLogo from "../../svg/components/MainLogo";
import { EyeIcon, UnderlineIcon, BipIcon, SearchIcon, UserIcon } from "../../svg/icons";
import { toggleContrastVersion, toggleUnderlineLinks } from "../../extra/theme";
// import HEADER_MENU from "../../extra/header_menu";

import "../../styles/header/header.scss";
import Breadcrumbs from "../general/Breadcrumbs";

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

	static propTypes = {
		header_menu: PropTypes.array,
		languages: PropTypes.array.isRequired,
		active_language: PropTypes.string.isRequired
	}

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
				props: {
					extra_classes:"header__link",
					active_language: this.props.active_language,
					languages: this.props.languages,
					onClick: this.props.changeLanguage
				},
			},
			{
				svg: <UserIcon />,
				extra_classes: `has-overlay ${this.state.show_auth ? "active" : ""} `,
				hidden_text: "login / logout",
				onClick: this.toggleAuth
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
		const { type } = this.props;
		if( !type ) return null;
		
		const subtitles = {
			"TOURISM": "Portal Turystyczny",
			"SPORT": "Sport",
			"CULTURE": "Kultura",
		}

		return subtitles[ type ];
	}


	render() {

		const { header_menu } = this.props;
		const { show_search, show_auth } = this.state;

		const header_links = this.getHeaderLinks();
		const header_actions = this.getHeaderActions();
		const header_subtitle = this.getHeaderSubtitle();

		const header_classes = ["header"];
		if( header_menu && header_menu.length ) header_classes.push("has-menu");

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

					{ header_menu && !!header_menu.length &&
					<div className="header-main__menu">
						{ header_menu.map(({ path, label }, index ) => (
							<Link key={ index } to={ path }> { label }  </Link>
						)) }
					</div>
					}
				</div>

				{ show_search && <SearchFrom /> }
				{ show_auth && <AuthPanel /> }
			</header>
		)
	}
} 
