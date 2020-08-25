import React, { Component } from 'react';
import Parser from "html-react-parser";
import { API, MOCK_API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import OneCarouseInRow from "../../components/carousel/OneCarouseInRow";

import Loader from "../../components/general/Loader";
import Breadcrumbs from "../../components/general/Breadcrumbs";

import EventSingleHead from "../../components/events/EventSingleHead";
import LoopEventsPost from "../../components/events/LoopEventsPost";

import SingleContainer from "../../components/common-single/SingleContainer";
import SingleContentBottom from "../../components/common-single/SingleContentBottom";


export default class EventSinglePage extends Component{

	constructor(props){
		super(props);

		this.state = {	
			loading: true,
			
			post: {},
			other_events: [],
			
			breadcrumbs: [
				{ label: "Główna", to: "/" },
				{ label: "Wydarzenia", to: "/events" }
			]
		}
	}


	componentDidMount = () => {
		setTimeout( () => this.getEvent(), 2000 );
	}


	getEvent = () => {
		MOCK_API.get("single-event.json")
		.then( res => {

			const { post } = res.data;
			console.log(res.data);
			if( post ) {
				
				const breadcrumbs = [...this.state.breadcrumbs, { label: post.title }];
				this.setState({ post, breadcrumbs }, () => this.getOtherEvents());
			}
		})
	}


	getOtherEvents = () => {
		MOCK_API.get("events.json")
		.then( res => this.setState({ other_events: res.data, loading: false }));
	}


	render(){

		const { loading, breadcrumbs, post, other_events } = this.state;
		const { content, title } = post;

		const single_head = 
			!loading 
			? { 
				title: post.title,
				thumbnail: post.thumbnail,
				category: post.category,
				dates: {
					start_date: post.start_date,
					end_date: post.end_date,
					start_time: post.start_time,
					end_time: post.end_time,
				}
			}
			: {};

		
		const other_events_carousel = {
			loading: loading,
			carousel: {
				heading: "Inne wydarzenia",
				path_to_all: "/events",
				items: other_events,
				ItemComponent: LoopEventsPost
			}
		}

		return(
			<>
				<MainHeaderSection extra_classes="single">		
					{ !loading && <Breadcrumbs breadcrumbs={ breadcrumbs } /> }
					{ loading && <Loader /> }	

					{ !loading && 
						<EventSingleHead { ...single_head } />
					}
				</MainHeaderSection>

				{ !loading && content && 
					<SingleContainer title={ title } >
						<div> { Parser( content )} </div>

						<SingleContentBottom />
					</SingleContainer> 
				}

				<OneCarouseInRow { ...other_events_carousel }/>
			</>
		)
	}
};