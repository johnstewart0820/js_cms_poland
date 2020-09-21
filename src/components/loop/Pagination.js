import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isFunction } from "../../extra/functions";
import "../../styles/loop/pagination.scss";
import Angle from '../../svg/components/Angle';

export default class Pagination extends Component{

	static propTypes = {
		total_amount: PropTypes.number.isRequired,
		active_page: PropTypes.number,
		pageChangeCallback: PropTypes.func
	}

	state = {
		active_page: (this.props.active_page || 0) + 1,
	}


	componentDidUpdate( prev_props ){
		if( prev_props.total_amount !== this.props.total_amount ){
			this.setState({ active_page: 1 });
		}
	}


	getMiddleItems = () => {

		const { active_page } = this.state;
		const { total_amount } = this.props;

		let start = 
			active_page - 1 <= 1 
				? 2 
				: active_page + 1 >= total_amount
					? total_amount - 3 > 1
						? total_amount - 3
						: 2
					: active_page - 1;

		let end = start + 2 >= total_amount ? total_amount - 1 : start + 2;


		const pagination_items = [];
		for( let num = start ; num <= end; num++ ){
			pagination_items.push( this.getOneItem( num ) );
		}

		const prev_empty_item = start > 2 ? <span key="prev_empty" > ... </span> : null;
		const next_empty_item = end + 1 < total_amount ? <span key="next_empty"> ... </span> : null;

		return [ prev_empty_item, ...pagination_items, next_empty_item ];
	}



	getOneItem = ( num, action ) => {
		const classes = num === this.state.active_page ? "active" : "";

		return ( 
			<button
				key={ action || num }
				onClick={ e => { e.preventDefault(); this.changePage( num ) }}
				className={ classes }> 
					{ !action && num } 

					{ action === "prev" && <Angle direction="left" /> }
					{ action === "next" && <Angle /> }
			</button>
		)
	}


	changePage = ( num ) => {
		
		this.setState({ active_page: num }, () => {
			const { pageChangeCallback } = this.props;

			if( isFunction( pageChangeCallback )) pageChangeCallback( num - 1 );
		})
	}


	render(){ 

		const { active_page } = this.state;
		const { total_amount } = this.props;

		if( total_amount <= 1 || !total_amount ) return null;

		const first_page = this.getOneItem( 1 );
		const last_page = this.getOneItem( total_amount );  
		const middle_items = this.getMiddleItems();

		const prev_arrow = active_page > 1 ? this.getOneItem( active_page -1, "prev" ) : null;
		const next_arrow =  active_page < total_amount ? this.getOneItem( active_page + 1, "next" ) : null;

		return(
			<div className="pagination">
				{ prev_arrow }
					
				{ first_page }

				{ middle_items }
					
				{ last_page }
					
				{ next_arrow }
			</div>
		)
	}
};

