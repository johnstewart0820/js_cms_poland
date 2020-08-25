import React, { Component } from 'react';
import Parser from "html-react-parser";
import { API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import OneCarouseInRow from "../../components/carousel/OneCarouseInRow";

import Loader from "../../components/general/Loader";
import Breadcrumbs from "../../components/general/Breadcrumbs";

import EventSingleHead from "../../components/events/EventSingleHead";
import LoopEventsPost from "../../components/events/LoopEventsPost";

import SingleContainer from "../../components/common-single/SingleContainer";
import SingleContentBottom from "../../components/common-single/SingleContentBottom";


export default class EventSinglePage extends Component{

	id = this.props.match.params ? this.props.match.params.id : null;

	state = {	
		loading: true,
		
		post: {},
		other_events: [],
		
		breadcrumbs: [
			{ label: "Główna", to: "/" },
			{ label: "Wydarzenia", to: "/events" }
		]
	}


	componentDidMount = () => {
		this.getEvent();
	}


	getEvent = () => {
		API.get(`contents/events/${this.id}`)
		.then( res => {

			const post = res.data.event;
			if( post ) {
				
				const breadcrumbs = [...this.state.breadcrumbs, { label: post.title }];
				this.setState({ post, breadcrumbs }, () => this.getOtherEvents());
			}
		})
		.catch( err => {});
	}


	getOtherEvents = () => {

		API.get("contents/events?limit=5")
		.then( res => {
			console.log( res.data );
			const { events } = res.data;

			this.setState({ other_events: events, loading: false });
		})
		.catch( err => {});
	}


	render(){

		const { loading, breadcrumbs, post, other_events } = this.state;
		const { content, title } = post;

		const single_head = 
			!loading 
			? { 
				title: post.title,
				thumbnail: post.original_image,
				category: post.categories_labels,
				dates: {
					start_date: post.event_start_date ? new Date( post.event_start_date * 1000 ) : null,
					end_date: post.event_end_date ? new Date( post.event_end_date * 1000 ) : null,
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

					{ !loading &&  <EventSingleHead { ...single_head } /> }
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