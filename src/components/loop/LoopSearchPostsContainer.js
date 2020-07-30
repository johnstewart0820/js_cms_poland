import React, { Component } from 'react';
import PropTypes from "prop-types";

import SectionHeading from "../general/SectionHeading";
import Select from "../form/Select";

import { isFunction } from '../../extra/functions';
import "../../styles/loop/loop-search-posts-container.scss";

export default class LoopSearchPostsContainer extends Component{

	static propTypes = {}
	
	state = {
		extra_classes:PropTypes.string,
		heading:PropTypes.string,
		sort_options:PropTypes.array,
		sortOnChange:PropTypes.func 
	}


	componentDidMount(){

		const { onRef } = this.props;
		if ( isFunction( onRef ) ) onRef( this.section ); 
	}

	render(){

		const { extra_classes, heading, sort_options, sortOnChange, children } = this.props;

		return(
			<section 
				ref={ (el) => this.section = el } 
				className={`loop-search-posts-container ${ extra_classes || "" }`} 
			>
				<div className="container">

					<div className="loop-search-posts-container__top">
						<SectionHeading heading={ heading } />


						{ sort_options && !!sort_options.length && 
							<Select 
								name="sort_by"
								label="Sortuj wg:"
								options={ sort_options }
								onChange={ sortOnChange }
							/>
						}
					</div>
					
					<div className="row">

						{ children }

					</div>
				</div>
			</section>
		)
	}
};