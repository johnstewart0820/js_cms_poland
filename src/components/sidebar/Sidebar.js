import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import SimpleLink from "../general/SimpleLink";
import MainMenu from "./MainMenu";

import social_links from "../../extra/social-links";
import { ListIcon, FacebookIcon, YouTubeIcon, InstagramIcon } from "../../svg/icons";

import "../../styles/sidebar/sidebar.scss";
import { SITE } from '../../extra/site_settings';


const socials = [
	{ svg: <FacebookIcon />, hidden_text: "facebook", href: social_links.facebook, target: "_blank" },
	{ svg: <YouTubeIcon />, hidden_text: "youtube", href: social_links.youtube, target: "_blank" },
	{ svg: <InstagramIcon />, hidden_text: "instagram", href: social_links.instagram, target: "_blank" }
];

class Sidebar extends Component {

	static propTypes = { }

	location_path = this.props?.history?.location?.pathname;

	state = {
		menu_open: false,
		height: SITE === "MAIN" ? "100vh" : "100%"
	}
	

	componentDidMount() {
		this.startInterval();
		window.addEventListener( "resize", this.calculateHeight );
	}


	componentDidUpdate () {
		if ( this.location_path !== this.props.history.location.pathname ) {
			this.location_path = this.props.history.location.pathname;
			this.startInterval()
		}
	}


	componentWillUnmount(){
		clearInterval( this.interval );
		window.removeEventListener( "resize", this.calculateHeight );
	}


	startInterval = () => {
		this.interval = setInterval( () => {
			if ( document.getElementById("main-header-section") ) {
				clearInterval( this.interval );
				this.calculateHeight();
			}
		}, 40);
	}


	calculateHeight = () => {
		clearInterval( this.interval );
		
		const main_header_section = document.getElementById("main-header-section");
		const header = document.getElementById("header");

		if( !main_header_section ) return;

		this.setState({ height: header.offsetHeight + main_header_section.offsetHeight });
	}


	toggleMainMenu = (e) => {
		e.preventDefault();
		this.setState({ menu_open: !this.state.menu_open })
	}


	render(){

		return (
			<div className="sidebar" style={{ height: this.state.height }}>
				<button type="button" className={`sidebar__trigger ${ this.state.menu_open ? "active" : "" }`} onClick={ this.toggleMainMenu }>
					<span className="d-none"> trigger </span>
					<ListIcon />
				</button>

				<div className="sidebar__socials">
					{ socials.map(( item, index ) => (
						<SimpleLink key={ index } { ...item } />
					))}
				</div>

				{ this.state.menu_open && 
					<MainMenu />
				}
			</div>
		)
	}
}

export default withRouter(Sidebar);