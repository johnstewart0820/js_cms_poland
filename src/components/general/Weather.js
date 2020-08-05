import React, { Component } from 'react';
import { API } from "../../extra/API";

import Arrows from '../buttons/Arrows';
import Loader from "./Loader";

import "../../styles/general/weather.scss";
import { getDateObjectFromDDMMYYYY, getAllFromDateObject } from "../../extra/date";

import { MainlyCloudy, PartlyCloudy, Sunny } from "../../svg/weather-icons";

export default class Weather extends Component{

	constructor(props){
		super(props);

		this.state = {
			loading: true,
			current_index: 0,
			weather: []
		}
	}


	componentDidMount() {
		this.getWeather();
	}


	getWeather = () => {
		API.get("mock/weather.json")
		.then ( res => this.setState({ weather: res.data, loading: false }));
	}


	getCurrentWeatherInfo = () => {
		const { weather, current_index } = this.state; 
		if( !weather || !weather.length ) return null;

		const info = weather[ current_index ];
		const { date, degrees, state } = info;

		const date_obj = getDateObjectFromDDMMYYYY( date );
		const { day_num, day_name, month_name } = getAllFromDateObject( date_obj );

		const icons = {
			"Częściowe zachmurzenie": <PartlyCloudy />,
			"Przeważnie pochmurno": <MainlyCloudy />,
			"Słoneczny": <Sunny />
		}

		return (
			<div className="weather__info">
				{ icons[ state ] }
				<span className="weather__info_degrees"> { degrees } </span>
				<div>
					<strong> { state } </strong>
					<span> { day_num } { month_name } </span>
					<strong> { day_name } </strong>
				</div>
			</div>
		)
	}


	switchWeather = ( action ) => {

		const { current_index } = this.state;

		switch ( action ){
			case "prev":
				if( current_index > 0) {
					this.setState({ loading: true }, () => {
						setTimeout(() => {

							this.setState({ current_index: current_index - 1, loading: false });
						}, 1000);
					})
				}
			break;

			case "next":
				if( current_index < this.state.weather.length - 1 ){
					this.setState({ loading: true }, () => {
						setTimeout(() => {

							this.setState({ current_index: current_index + 1, loading: false });
						}, 1000)
					});
				}

			break;

			default:
				console.warn(`Unhandled switch weather action [${action}]`);
		}
	}


	render(){

		if( this.state.loading ){
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