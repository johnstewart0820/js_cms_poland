import React, { Component } from 'react';
import { API, MOCK_API } from "../../extra/API";


import Carousel from '../carousel/Carousel';
import LoopNewsPost from "../news/LoopNewsPost";
import LoopEventsPost from "../events/LoopEventsPost";
import Loader from "../general/Loader";

import "../../styles/general/last-event-and-news.scss";


export default class LastEventAndNews extends Component{

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
		this.getLastNews();
		this.getLastEvents();
	}


	getLastNews = () => {
		MOCK_API.get("mock/news.json")
		.then( res => this.setState({ last_news: res.data, news_loading: false }));
	}


	getLastEvents = () => {
		MOCK_API.get("mock/events.json")
		.then( res => this.setState({ last_events: res.data, events_loading: false }));
	}


	render(){

		const { last_news, last_events, news_loading, events_loading } = this.state;

		const loader_style = { minHeight: "600px" };

		return(
			<section className="last-event-and-news">

				<div>

					{ events_loading && <Loader style={ loader_style } /> }

					{ !events_loading && last_events && last_events.length > 0 &&  
						<Carousel
							heading="Najbliższe wydarzenia"
							items={ last_events }
							ItemComponent={ LoopEventsPost }
						/>
					}
				</div>

				<div>

					{ news_loading && <Loader style={ loader_style } /> }

					{ !news_loading && last_news && last_news.length > 0 && 
						<Carousel
							heading="Ostatnie aktualności"
							items={ last_news }
							ItemComponent={ LoopNewsPost }
						/>
					}
				</div>
			</section>
		)
	}
};