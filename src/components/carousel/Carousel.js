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
	
	movement_duration = 650;
	movement = false;
	min_slides = 2;

	state = {
		loading: true,
		items: this.props.items,
		posts_length: 0,
		wrap_left: 0,
		transition: true,
	}
	

	moveItems = action => {

		if( this.movement || this.state.items.length < this.min_slides ) return;
		this.movement = true;
		
		const item = this.carousel_wrap.children[0]
		const item_width = item.offsetWidth;
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


	slideOnTouchStart = e => this.touch_start = e.changedTouches[0].screenX;


	slideOnTouchEnd = e => {

		console.log( this.touch_start );
		const touch_end = e.changedTouches[0].screenX;
		if ( Math.abs( this.touch_start - touch_end ) >= 24 ) {
			
			const action = this.touch_start > touch_end ? "next" : "prev";
			this.moveItems( action );
		}
	}


	render(){

		const { heading, extra_classes, ItemComponent, path_to_all, link_to_all, bodyStyles , containerStyles} = this.props;
		const { items, wrap_left, transition } = this.state;

		if( !items || !items.length || !ItemComponent ) return null;

		const wrap_styles = {
			transition: transition ? "left .6s" : "",
			left: wrap_left
		}

		return (
				<div className={`carousel ${ extra_classes || "" }`} style={ containerStyles }>

					<div className="carousel__head">
						<SectionHeading heading={ heading } />
						<LinkToAll path={ path_to_all } href={ link_to_all }  />
					</div>

					<div className="carousel__body" style={ bodyStyles }>

						{ items && items.length >= this.min_slides && 
							<Arrows onClick={ this.moveItems } /> 
						}

						{ items && items.length < this.min_slides &&	<div className="carousel__arrows-placeholder"/> }

						<div 
							className="carousel__overflow" 
							onTouchStart={ this.slideOnTouchStart }
							onTouchEnd={ this.slideOnTouchEnd } 
						> 
							<div ref={ el => this.carousel_wrap = el } className="carousel__wrap" style={ wrap_styles }>
								{ items && !!items.length &&
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
