import React, { Component } from 'react';
import PropTypes from "prop-types";
import Loader from "./Loader";

export default class LazyThumbnail extends Component{

	static propTypes = { src: PropTypes.string.isRequired }

	state = { src: null };

	componentDidMount() {
		this.uploadPhoto();
	}


	uploadPhoto = () => {
		const { src } = this.props;
  
		const image_loader = new Image();
		image_loader.src = src;
		image_loader.onload = () => this.setState({ src });
	}


	render(){

		const { extra_classes, src } = this.props;
		if( !src ) return null;

		return(
			<div
				className={`thumbnail ${ extra_classes || "" }`}
				style={{ backgroundImage: `url(${ this.state.src })` }}
			>
				{ !this.state.src && <Loader/> }	
			</div>
		)
	}
};