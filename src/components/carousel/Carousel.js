import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LinkToAll from "../buttons/LinkToAll";
import Arrows from '../buttons/Arrows';
import SectionHeading from "../general/SectionHeading";

import "../../styles/carousel/carousel.scss";

export default class Carousel extends Component{

	static propTypes = {
		heading: PropTypes.string,
		items: PropTypes.array.isRequired,
		extra_classes: PropTypes.string,
		ItemComponent: PropTypes.elementType.isRequired,
		path_to_all:PropTypes.string,
		link_to_all:PropTypes.string
	};
	
	constructor(props){
		super(props);

		this.movement_duration = 650;
		this.movement = false;

		this.state = {
			loading: true,
			items: this.props.items,
			posts_length: 0,
			wrap_left: 0,
			transition: true,
		}
	}
	

	moveItems = ( action ) => {

		if( this.movement ) return;
		this.movement = true;
		
		const item = this.carousel_wrap.children[0]
		const item_width = item.clientWidth;
		const item_margin = +window.getComputedStyle(item).getPropertyValue("margin-right").replace("px", "");

	
		switch ( action ) {
			case "next":

				this.setState({ transition: true }, () => {
					const first_item_clone = this.state.items.slice(0, 1);
					const items = [...this.state.items, ...first_item_clone ];
	
					this.setState({ items }, () => {
						
						const wrap_left = this.state.wrap_left - item_width - item_margin;
						this.setState({ wrap_left }, () => {
	
								setTimeout(() => {
	
									this.setState({ transition: false }, () => {
										const items = this.state.items.slice(1);
										this.setState({ items, wrap_left: 0 }, () => this.movement = false );
									})
	
								}, this.movement_duration )
						})
					});
				});

				break;

			case "prev":

				this.setState({ transition: false }, () => {

					const last_item_clone = this.state.items.slice(-1);
					const items = [ ...last_item_clone, ...this.state.items ];
					const wrap_left = this.state.wrap_left - item_width - item_margin;

					this.setState({ wrap_left, items }, () => {
						
						setTimeout(() => {
							
							this.setState({ transition: true }, () => {

								this.setState({ wrap_left: 0 }, () => {

									setTimeout(() => {
		
										const items = this.state.items.slice(0, -1);
										this.setState({ items }, () => this.movement = false );

									}, this.movement_duration);
								})

							})

						}, 60);
					})
				});

				break;

			default:
				console.warn(`Unhandled move items action [${action}]`);
		}
	}


	render(){

		const { heading, extra_classes, ItemComponent, path_to_all, link_to_all } = this.props;
		const { items, wrap_left, transition } = this.state;

		if( !items || !items.length || !ItemComponent ) return null;

		const wrap_styles = {
			transition: transition ? "left .6s" : "",
			left: wrap_left
		}

		return (
				<div className={`carousel ${ extra_classes || "" }`}>

					<div className="carousel__head">
						<SectionHeading heading={ heading } />
						<LinkToAll path={ path_to_all } href={ link_to_all }  />
					</div>

					<div className="carousel__body">

						<Arrows onClick={ this.moveItems } />

						<div className="carousel__overflow">
							<div ref={ el => this.carousel_wrap = el } className="carousel__wrap" style={ wrap_styles }>
								{ items && items.length > 0 &&
									items.map(( item, index ) => (
										<ItemComponent key={ index } {...item } />
									))
								}
							</div>
						</div>

					</div>
			  </div>
		)
	}
}
