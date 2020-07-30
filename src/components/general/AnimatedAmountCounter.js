import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class AnimatedAmountCounter extends Component{

	static propTypes = { 
		final_num: PropTypes.number.isRequired, 
		second_final_num: PropTypes.number 
	}

	constructor(props){
		super(props);

		this.component = React.createRef();
		this.animated = false;

		this.state = {
			num: 0,
			second_num: 0,
		}
	}


	componentDidMount(){
		this.checkIsComponentVisible();
		window.addEventListener( "scroll", this.checkIsComponentVisible );
	}


	componentWillUnmount(){
		clearInterval( this.animation );
		window.removeEventListener( "scroll", this.checkIsComponentVisible );
	}


	checkIsComponentVisible = () => {
		if( this.animated ) return;

		const component = this.component.current;

		const component_bottom = component.getBoundingClientRect().bottom + window.pageYOffset;
		const window_bottom = window.pageYOffset + window.innerHeight;

		if( component_bottom <= window_bottom ) this.startAnimation();
	}


	startAnimation = () => {
		this.animated = true;
		
		const { final_num, second_final_num } = this.props;
		const is_two_numbers = !!second_final_num && !isNaN( second_final_num );

		const step = final_num > 999 ? 5 : 1;
		const second_step = is_two_numbers && second_final_num > 999 ? 5 : 1; 

		if( final_num && !isNaN( final_num ) && toString.call( final_num ) === "[object Number]" ){
			
			this.animation = setInterval( () => {

				const { num } = this.state;
				const { second_num } = this.state;


				const end_condition = 
					is_two_numbers
						? num >= final_num && second_num >= second_final_num
						: num >= final_num;
				
				if( end_condition ) {
					
					this.setState({ num: final_num, second_num: is_two_numbers ? second_final_num : 0 });
					clearInterval( this.animation );
					return;

				} else {

					const next_num = num + step;
					const next_second_num = is_two_numbers ? second_num + second_step : 0; 

					this.setState({ 
						num: next_num,
						second_num: next_second_num
					});
				}		
				
			}, 0);
		}
	}


	render(){

		const { final_num } = this.props;
		const { num, second_num } = this.state;
		if( !final_num || isNaN( final_num )) return null;

		return(
			<span ref={ this.component }> { num } { !!second_num && `- ${second_num}` } </span>
		)
	}
};