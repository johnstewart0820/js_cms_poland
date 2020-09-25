import React, { Component } from 'react';
import PropTypes from "prop-types";

import GalleryItem from "./GalleryItem"; 
import ExpandedGallery from "./ExpandedGallery";
import OneCarouselInRow from "../carousel/OneCarouseInRow";

import "../../styles/gallery/gallery.scss";

export default class Gallery extends Component{

	static propTypes = {
		items: PropTypes.array.isRequired,
		heading: PropTypes.string
	}

	constructor(props){
		super(props);

		this.state = {
			expanded: false,
			active_photo: 0
		}
	}


	itemClick = ( item_index ) => this.setState({ expanded: true, active_photo: item_index });


	closeExpanded = () => this.setState({ expanded: false }); 


	render(){

		if( !this.props.items || !this.props.items.length ) return null;

		const { expanded, active_photo } = this.state;
		const items = this.props.items.map(( item, index ) => ({...item, index, onClick: this.itemClick }));

		const carousel = {
			items,
			extra_classes: "arrows-on-right",
			heading: this.props.heading || "Galeria",
			ItemComponent: GalleryItem
		};

		const expanded_gallery = { items, active_photo, closeHandler: this.closeExpanded };

		return(
			<div className="gallery">
				<OneCarouselInRow loading={ false } carousel={ carousel } />

				{ expanded && 
					<ExpandedGallery {...expanded_gallery} />
				}
			</div>
		)
	}
};