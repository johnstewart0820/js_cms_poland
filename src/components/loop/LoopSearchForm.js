import React, { Component } from 'react';
import PropTypes from "prop-types";

import LOOP_SEARCH_INPUTS from '../../extra/loop_search_inputs';
import { isFunction } from "../../extra/functions";

import "../../styles/buttons/button-link.scss";
import "../../styles/loop/loop-search-form.scss";

export default class LoopSearchForm extends Component{

	static propTypes = {
		heading: PropTypes.string,
		submit_label: PropTypes.string,
		submitCallback: PropTypes.func,
		extraClasses: PropTypes.string,
		submitButtonExtraClasses: PropTypes.string
	}

	state = {
		
	}


	submitForm = e => {
		e.preventDefault();

		const { submitCallback } = this.props;
		if ( isFunction( submitCallback ) ) submitCallback();
	}


	render(){

		const { heading, submit_label, extraClasses, submitButtonExtraClasses } = this.props;
		const inputs = LOOP_SEARCH_INPUTS[ this.props.type ];

		if( !inputs || !inputs.length ) return null;

		return(
			<form className={`loop-search-form ${extraClasses || ''}`} onSubmit={ this.submitForm }>
				<div className="container">

					<div className="heading"> { heading } </div>

					<div className="row">

						{ inputs && !!inputs.length && 
							inputs.map( item => (
								<item.Component key={ item.id || item.name } {...item } />
							))
						}

						<button type="submit" className={`button-link green ${submitButtonExtraClasses}`}> { submit_label || "Filtruj" }  </button>

					</div>
				</div>
			</form>
		)
	}
};