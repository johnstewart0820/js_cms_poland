import React, { useEffect, useState, useMemo } from 'react';
import { API } from "../../extra/API";

import Arrows from '../buttons/Arrows';
import Loader from "./Loader";

import "../../styles/general/weather.scss";
import { getDateObjectFromDDMMYYYY, getLocalDateString, getAllFromDateObject } from "../../extra/date";

import { 
	Sunny,
	Rain,
	Storm,
	BlindRain,
	MainlyCloudy,
	PartlyCloudy
} from "../../svg/weather-icons";

import TRANSLATIONS from "../../extra/translations";
import LocalStorage from "../../constants/LocalStorage";


let touch_start;
const today_date = getLocalDateString( new Date());

export default function Weather () {
	
	const [ loading, setLoading ] = useState( true );
	const [ current_index, setCurrentIndex ] = useState( null );
	const [ weather_days, setWeatherDays ] = useState( [] );

	const current_translations = useMemo(() => {
		const locale = localStorage.getItem( LocalStorage.Locale );
		return TRANSLATIONS[ locale ];
	});

	const current_weather_info = useMemo( getCurrentWeatherInfo, [ current_index ])


	useEffect(() => {

		const getWeather = () => {

			API.get("weather")
			.then( res => {
				// console.log( res.data.reduce(( total, item ) => { total[item.weather] = 1; return total }, {} ));

				setWeatherDays( getWeatherForEachDay( res.data ));
				setCurrentIndex( 0 );
				setLoading( false );
			})
			.catch( err => {})
		}

		const getWeatherForEachDay = all_data => {
			return all_data && all_data.length
				? all_data.reduce(( total, current ) => {
		
					const { date, timestamp } = current;
		
					if ( date === today_date ) {
						if ( !total[0] ) total[0] = current;
					} else {
		
						if ( new Date( timestamp * 1000 ).getHours() === 12 )
							total.push( current );
					}
		
					return total;
				}, [])
				: []
		}

		getWeather();

	}, []);


	function getCurrentWeatherInfo () {

		if ( !weather_days || !weather_days.length ) return null;
	
		const info = weather_days[ current_index ];
		const { date, temp, weather, icon_url } = info;
	
		const date_obj = getDateObjectFromDDMMYYYY( date );
		const { day_num, day_name, month_name } = getAllFromDateObject( date_obj );
	
		const weather_icons = {
			"clear sky" : <Sunny />,
	
			"light rain": <Rain />,
			"moderate rain": "",
	
			"few clouds": <PartlyCloudy/>,
			"broken clouds": <PartlyCloudy/>,
			"scattered clouds": <MainlyCloudy/>,
			"overcast clouds": <MainlyCloudy/>,
		};


		const svg = weather_icons[ weather ];
		const weather_label = current_translations?.[ weather ] || weather; 
	
		return (
			<div className="weather__info">
	
				{ svg || <img src={ icon_url } alt={ weather } /> }
				
				<span className="weather__info_degrees"> { Math.round( temp ) } </span>
				
				<div>
					<strong> { weather_label } </strong>
					<span> { +day_num } { month_name } </span>
					<strong> { day_name } </strong>
				</div>
			</div>
		)
	}


	const switchWeather = action => {

		switch ( action ){
			case "prev":
				if ( current_index > 0 )
					setCurrentIndex( current_index - 1 );
			break;

			case "next":
				if ( current_index < weather_days.length - 1 )
					setCurrentIndex( current_index + 1 );
			break;

			default:
				console.warn(`Unhandled switch weather action [${action}]`);
		}
	}


	const slideOnTouchStart = e => touch_start = e.changedTouches[0].screenX;


	const slideOnTouchEnd = e => {

		const touch_end = e.changedTouches[0].screenX;
		if ( Math.abs( touch_start - touch_end ) >= 24 ) {
			
			const action = touch_start > touch_end ? "next" : "prev";
			touch_start = null;
			switchWeather( action );
		}
	}


	if ( loading ){
		return (
			<div className="weather"> <Loader /> </div>
		)
	}


	return (
		<div 
			className="weather" 
			onTouchStart={ slideOnTouchStart }
			onTouchEnd={ slideOnTouchEnd } 
		>
			{ current_weather_info }
			{/* { weather_days && weather_days.length > 1 && <Arrows onClick={ switchWeather } /> } */}
			<Arrows onClick={ switchWeather } />
		</div>
	)
}






	


	
