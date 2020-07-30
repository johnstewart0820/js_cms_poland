import React, { Component } from 'react';
import Parser from "html-react-parser";
import { API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import OneCarouseInRow from "../../components/carousel/OneCarouseInRow";

import Gallery from "../../components/gallery/Gallery";

import Loader from "../../components/general/Loader";
import Breadcrumbs from "../../components/general/Breadcrumbs";

import NewsSingleHead from "../../components/news/NewsSingleHead";
import LoopNewsPost from "../../components/news/LoopNewsPost";

import SingleContainer from "../../components/common-single/SingleContainer";
import SingleContentBottom from "../../components/common-single/SingleContentBottom";


export default class NewsSinglePage extends Component{

	constructor(props){
		super(props);

		this.state = {	
			loading: true,
			
			post: {},
			other_events: [],
			
			breadcrumbs: [
				{ label: "Główna", to: "/" },
				{ label: "Aktualności", to: "/news" }
			]
		}
	}


	componentDidMount = () => {
		setTimeout( () => this.getNews(), 2000 );
	}


	getNews = () => {
		API.get("mock/single-new.json")
		.then( res => {

			const { post } = res.data;
			if( post ) {
				
				const breadcrumbs = [...this.state.breadcrumbs, { label: post.title }];
				this.setState({ post, breadcrumbs }, () => this.getLastNews());
			}
		})
	}


	getLastNews = () => {
		API.get("mock/news.json")
		.then( res => this.setState({ last_news: res.data, loading: false }));
	}


	render(){

		const { loading, breadcrumbs, post, last_news } = this.state;
		const { content, title, gallery } = post;

		const single_head = 
			!loading 
			? { 
				title: post.title,
				thumbnail: post.thumbnail,
				category: post.category,
				date: post.date
			}
			: {};

		
		const last_news_carousel = {
			loading: loading,
			carousel: {
				heading: "Ostatnie aktualności",
				path_to_all: "/news",
				items: last_news,
				ItemComponent: LoopNewsPost
			}
		}

		return(
			<>
				<MainHeaderSection extra_classes="single">		
					{ !loading && <Breadcrumbs breadcrumbs={ breadcrumbs } /> }
					{ loading && <Loader /> }	

					{ !loading && 
						<NewsSingleHead { ...single_head } />
					}
				</MainHeaderSection>

				{ !loading && content && 
					<>
						<SingleContainer title={ title } >
							<div> { Parser( content )} </div>

							<SingleContentBottom />
						</SingleContainer>

						{ gallery && !!gallery.length && <Gallery items={ gallery } /> }
					</> 
				}

				<OneCarouseInRow { ...last_news_carousel }/>
			</>
		)
	}
};