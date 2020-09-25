import React, { Component } from 'react';
import PropTypes from "prop-types";

import ExpandedGalleryItem from "./ExpandedGalleryItem";
import CloseButton from "../buttons/CloseButton";
import Angle from '../../svg/components/Angle';

import "../../styles/gallery/expanded-gallery.scss";

export default class ExpandedGallery extends Component{

	static propTypes = {
		items: PropTypes.array.isRequired,
		active_photo: PropTypes.number,
		closeHandler: PropTypes.func.isRequired
	}

	constructor(props){
		super(props);

		this.state = {
			active_photo: this.props.active_photo || 0
		}
	}



	changePhoto = ( action ) => {

		let { active_photo } = this.state;
		const items_length = this.props.items.length;

		switch( action ){
			case "next":
				active_photo = ( active_photo === items_length - 1 ) ? 0 : active_photo + 1;
			break;

			case "prev":
				active_photo = ( active_photo === 0 ) ? items_length - 1 : active_photo - 1;
			break;

			default:
				console.warn(`Unhandled change photo action [${action}]`);
		}

		this.setState({ active_photo });
	}


	render(){

		const { active_photo } = this.state;
		const { items, closeHandler } = this.props;
        console.log("ccscw"+items)
		if( !items || !items.length ) return null;


		return(
			<div className="expanded-gallery">

				{ ["prev", "next"].map(( action, index) => (
					<a 
						key={ index }
						href="#" 
						className={`expanded-gallery__arrow ${ action }`} 
						onClick={ e => { e.preventDefault(); this.changePhoto( action )}}> 
							<Angle direction={ action === "prev" ? "left" : "right" }/>
							<span className="d-none"> { action } </span>  
					</a>
				))}


				<CloseButton onClick={ closeHandler } />

				<div className="expanded-gallery__items">
					{ items && items.length > 0 &&
						items.map((item, index) => (
							<ExpandedGalleryItem key={ index } {...item } active={ active_photo === index } />
						))
					}
				</div>

				<div className="expanded-gallery__bottom">
					<div className="expanded-gallery__title heading"> { items[ active_photo ].title } </div>
					<div className="expanded-gallery__desc"> { items[ active_photo ].desc } </div>
				</div>
			</div>
		)
	}
};