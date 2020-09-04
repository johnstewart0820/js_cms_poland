import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import HeaderMenu from "./HeaderMenu";
import HeaderActions from "./HeaderActions";
import SimpleLink from "../general/SimpleLink";
import AuthPanel from "../auth/AuthPanel";
import LanguageSwitcher from "../general/LanguageSwitcher";

import MainLogo from "../../svg/components/MainLogo";
import { UserIcon } from "../../svg/icons";
import { SITE } from "../../extra/site_settings";
import UserContext from "../../constants/UserContext";


import "../../styles/header/header.scss";


class Header extends Component {

	static contextType = UserContext;

	state = {
		show_auth: false
	}


	toggleAuth = e => {
		e.preventDefault();
		this.setState({ show_auth: !this.state.show_auth });
	}


	getHeaderExtraActions = () => {
		const actions = [
			{
				component: LanguageSwitcher,
				props: {	extra_classes:"header__link" },
			},
			{
				svg: <UserIcon />,
				extra_classes: `has-overlay ${this.state.show_auth ? "active" : ""} `,
				hidden_text: "login / logout",
				onClick: this.context.id ? () => (this.props.history.push('/profile')) : this.toggleAuth
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

		const { show_auth } = this.state;

		const header_extra_actions = this.getHeaderExtraActions();
		const header_subtitle = this.getHeaderSubtitle();

		const header_classes = ["header"];
		if ( SITE !== "MAIN" ) header_classes.push("has-menu");

		return (
			<header id="header" className={ header_classes.join(" ") }>
				<Link to="/" className="header-logo">
					<MainLogo />
					{ header_subtitle &&  <span> { header_subtitle } </span> }
				</Link>

				<div className="header-main">
					<div className="header-main__top">
						<HeaderActions />
						{ header_extra_actions }
					</div>

					<HeaderMenu />
				</div>

				{ !this.context.id && show_auth && <AuthPanel /> }
			</header>
		)
	}
}

export default withRouter(Header);