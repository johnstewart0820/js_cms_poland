import React, { Component } from 'react';

import { TileMark } from "../../svg/icons";


export default class MainHeaderTile extends Component{

	timer = null;
	delay = 1300;

	state = {
		show_links: false
	}


	componentWillUnmount(){
		clearTimeout( this.timer );
	}


	onMouseOver = () => {		
		if( this.timer ) return;

		this.timer = setTimeout(() => {
			this.setState({ show_links: true });
		}, this.delay )
	}

	onMouseLeave = () => {

		clearTimeout( this.timer );
		this.timer = null;
		
		this.setState({ show_links: false });
	}

	render(){

		const { main_href, title, items, bg, extra_class } = this.props;
		const { show_links } = this.state;

		return(
			<a  
				target={'_blank'}
				rel={'noopener noreferrer'}
				href={ main_href }
				onMouseOver={ this.onMouseOver }
				onMouseLeave={ this.onMouseLeave }
				className={`main-header-tiles-section__tile thumbnail ${ show_links ? "show-links" : "" } ${ extra_class || "" }`}
				style={{ backgroundImage: `url(${ bg })` }}
			>
				<div className="main-header-tiles-section__tile_info">
					<TileMark />
					<div className="heading"> { title } </div>
					<span/>
				</div>

				{ items && items.length > 0 &&
					<div className="main-header-tiles-section__tile_links">
					{ items.map(({ svg, title, href }, index) => (
						
						<a href={ href } target="_blank" rel={'noopener noreferrer'} key={ index } >
							{ svg }
							<div> { title } </div>
							<span/>
						</a>
						
					)) }
					</div>
				}
			</a>	
		)
	}
};