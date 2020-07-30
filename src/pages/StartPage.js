import React, { Component } from 'react';
import { API } from "../extra/API";

import MainHeaderSection from "../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import MainHeaderTilesSection from "../components/header/MainHeaderTilesSection";
import MainHeaderExternalLink from "../components/header/MainHeaderExternalLink";
import Weather from "../components/general/Weather";


export default class StartPage extends Component{

	constructor(props){
		super(props);

		this.state = {

			news_loading: true,
			events_loading: true,

			last_news: [],
			last_events: []
		}
	}


	componentDidMount(){
		setTimeout(() => {
			this.getLastNews();
			this.getLastEvents();
		}, 2000)
	}


	getLastNews = () => {
		API.get("mock/news.json")
		.then( res => this.setState({ last_news: res.data, news_loading: false }));
	}


	getLastEvents = () => {
		API.get("mock/events.json")
		.then( res => this.setState({ last_events: res.data, events_loading: false }));
	}


	render(){

		const { last_events, events_loading } = this.state;
		const { last_news, news_loading } = this.state;

		const first_carousel = { loading: events_loading, path_to_all: "/events", heading: "Najbliższe wydarzenia", items: last_events, component: LoopEventsPost };
		const second_carousel = { loading: news_loading, path_to_all: "/news", heading: "Ostatnie aktualności", items: last_news, component: LoopNewsPost };

		const carousels = { first_carousel, second_carousel };		

		return (
			<>
				<MainHeaderSection> 
					
					<MainHeaderTilesSection />

					<div className="row">
						<MainHeaderExternalLink />
						<Weather />
					</div>
				</MainHeaderSection>

				<TwoCarouselsOneRow {...carousels } />

				<MapWithPinsFiltering type="trip" />
			</>
		)
	}
}
