import React, { Component } from 'react';
import { API } from "../../extra/API";

import Arrows from '../buttons/Arrows';
import Loader from "./Loader";

import "../../styles/general/weather.scss";
import { getDateObjectFromDDMMYYYY, getLocalDateString, getAllFromDateObject } from "../../extra/date";

export default class Weather extends Component{

	today_date = getLocalDateString( new Date() );

	state = {
		loading: true,
		current_index: 0,
		weather_days: []
	}


	componentDidMount() { this.getWeather() }


	getWeather = () => {

		API.get("weather")
		.then( res => {
			
			const { data } = res;
			const weather_days = this.getWeatherForEachDay( data );


			const ww = data.reduce(( total, current) => {

				total[current.weather] = 1
				return total;
			}, {})

			console.log(ww);

			this.setState({ weather_days, loading: false });
		})
		.catch( err => { })
	}


	getWeatherForEachDay = all_data => {
		return all_data && all_data.length
			? all_data.reduce(( total, current) => {

				const { date, timestamp } = current;

				if( date === this.today_date ) {
					if( !total[0] ) total[0] = current;
				} else {

					if( new Date( timestamp * 1000 ).getHours() === 12 )
						total.push( current );
				}

				return total;
			}, [] )
			: []
	}


	getCurrentWeatherInfo = () => {

		const { weather_days, current_index } = this.state; 
		if( !weather_days || !weather_days.length ) return null;

		const info = weather_days[ current_index ];
		const { date, temp, weather, icon_url } = info;

		const date_obj = getDateObjectFromDDMMYYYY( date );
		const { day_num, day_name, month_name } = getAllFromDateObject( date_obj );

		const weather_translation = {
			"few clouds": "",
			"scattered clouds": "",
			"clear sky" : "",
			"overcast clouds": "",
			"broken clouds": "",
			"light rain": ""
		}

		return (
			<div className="weather__info">
				<img src={ icon_url } alt={ weather } />
				
				<span className="weather__info_degrees"> { Math.round(temp) } </span>
				
				<div>
					<strong> { weather } </strong>
					<span> { day_num } { month_name } </span>
					<strong> { day_name } </strong>
				</div>
			</div>
		)
	}


	switchWeather = action => {

		const { current_index } = this.state;

		switch ( action ){
			case "prev":
				if ( current_index > 0) {
					this.setState({ current_index: current_index - 1 });
				}
			break;

			case "next":
				if ( current_index < this.state.weather_days.length - 1 ) {
					this.setState({ current_index: current_index + 1 });
				}

			break;

			default:
				console.warn(`Unhandled switch weather action [${action}]`);
		}
	}


	render(){

		const { loading } = this.state;

		if( loading ){
			return (
				<div className="weather"> <Loader /> </div>
			)
		}

		return(
			<div className="weather">
				{ this.getCurrentWeatherInfo() }
				<Arrows onClick={ this.switchWeather } />
			</div>
		)
	}
};