import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SimpleLink from "./SimpleLink";

import "../../styles/general/sidebar-menu.scss";
import social_links from "../../extra/social-links";
import { ListIcon, FacebookIcon, YouTubeIcon, InstagramIcon } from "../../svg/icons";
import { MAIN_MENU } from "../../extra/main_menu";

const socials = [
	{ svg: <FacebookIcon />, hidden_text: "facebook", href: social_links.facebook, target: "_blank" },
	{ svg: <YouTubeIcon />, hidden_text: "youtube", href: social_links.youtube, target: "_blank" },
	{ svg: <InstagramIcon />, hidden_text: "instagram", href: social_links.instagram, target: "_blank" }
];

class SidebarMenu extends Component {

	static propTypes = { }

	constructor(props){
		super(props);

		this.state = { 
			menu_open: false
		}
	}


	toggleMainMenu = (e) => {
		e.preventDefault();
		this.setState({ menu_open: !this.state.menu_open })
	}


	render(){

		return (
			<div className="sidebar-menu">
				<button type="button" className="sidebar-menu__trigger" onClick={ this.toggleMainMenu }>
					<span className="d-none"> trigger </span>
					<ListIcon />
				</button>

				<div className="sidebar-menu__socials">
					{ socials.map(( item, index ) => (
						<SimpleLink key={ index } { ...item } />
					))}
				</div>


			</div>
		)
	}
}

export default SidebarMenu;