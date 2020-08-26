import React, { Component } from 'react';
import { API, MOCK_API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../../components/carousel/TwoCarouselsOneRow";
import LoopEventsPost from "../../components/events/LoopEventsPost";
import LoopNewsPost from "../../components/news/LoopNewsPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import TextLinkPic from "../../components/general/TextLinkPic";
import PicsTextLink from "../../components/general/PicsTextLink";
import PicturesSlider from "../../components/slider/PicturesSlider";
import LoopAccommodationPost from '../../components/accommodation/LoopAccommodationPost';
import LoopGastronomyPost from "../../components/gastronomy/LoopGastronomyPost";
import LinksTiles from "../../components/general/LinksTiles";


import { sample_slides as slides } from "../../mock/slides_example";

const pics_text_link1 = {
	heading: "Miasto",
	pics: [
		{ url: "/img/loop/1.jpg", label: "Fotorelacje" },
		{ url: "/img/loop/3.jpg", label: "INFORMACJE PRAKTYCZNE" },
		{ url: "/img/loop/1.jpg", label: "BEZPIECZNY USTROŃ" },
	],
	text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit",
	link: "/aaaa",
	link_label: "dowiedz się więcej"
};


const pics_text_link2 = {
	heading: "Co zwiedzić?",
	pics: [
		{ url: "/img/loop/1.jpg", label: "ATRAKCJE" },
		{ url: "/img/loop/3.jpg", label: "SZLAKI" },
		{ url: "/img/loop/1.jpg", label: "RABATY" },
	],
	text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit",
	link: "/aaaa",
	link_label: "dowiedz się więcej"
};


const text_link_pic = {
	heading: "Uzdrowisko",
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	link: "#",
	link_label: "dowiedz się więcej",
	picture: "/img/pics/1.jpg"
};


const links_tiles = [
	{ href: "/", label: "Komunikacja kolejowa" },
	{ href: "/", label: "Komunikacja autobusowa" },
	{ href: "/", label: "Taxi" },
	{ href: "/", label: "Parkingi" },
]

export default class MainPage extends Component{

	constructor(props){
		super(props);

		this.state = {

			slides: [],

			news_loading: true,
			events_loading: true,
			accommodations_loading: true,
			gastronomy_loading: true,
			
			last_news: [],
			last_events: [],
			accommodations: [],
			gastronomy: []
		}
	}


	componentDidMount(){

		this.getLastEvents();


		setTimeout(() => {
			this.setState({ slides });
			this.getLastNews();

			this.getAccommodations();
			this.getGastronomy();
		}, 2000);
	}


	getLastNews = () => {
		MOCK_API.get("news.json")
		.then( res => this.setState({ last_news: res.data, news_loading: false }));
	}


	getLastEvents = () => {
		API.get("contents/events?limit=5")
		.then( res => {
			// console.log( res.data );
			const { events } = res.data;

			this.setState({ last_events: events, events_loading: false });
		})
		.catch( err => {});
	}


	getAccommodations = () => {
		MOCK_API.get("accommodations.json")
		.then( res => this.setState({ accommodations: res.data, accommodations_loading: false }));	
	}


	getGastronomy = () => {
		MOCK_API.get("gastronomy.json")
		.then( res => this.setState({ gastronomy: res.data, gastronomy_loading: false }));	
	}


	render(){

		const { slides } = this.state;

		const { last_events, events_loading } = this.state;
		const { last_news, news_loading } = this.state;
		const { accommodations, accommodations_loading } = this.state;
		const { gastronomy, gastronomy_loading } = this.state;


		const events_carousel = { loading: events_loading, path_to_all: "/events", heading: "Wydarzenia", items: last_events, component: LoopEventsPost };
		const news_carousel = { loading: news_loading, path_to_all: "/news", heading: "Ostatnie aktualności", items: last_news, component: LoopNewsPost };
		const accommonations_carousel = { loading: accommodations_loading, path_to_all: "/accommodations", heading: "BAZA NOCLEGOWA", items: accommodations, component: LoopAccommodationPost }
		const gastronomy_carousel = { loading: gastronomy_loading, path_to_all: "/gastronomy", heading: "BAZA GASTRONOMICZNA", items: gastronomy, component: LoopGastronomyPost };

		const carousels1 = { first_carousel: events_carousel, second_carousel: news_carousel };
		const carousels2 = { first_carousel: accommonations_carousel, second_carousel: gastronomy_carousel };
		

		return (
			<>
				<MainHeaderSection extra_classes="subpage">
					
					<Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl " }]} />
					<PicturesSlider slides={ slides } />

				</MainHeaderSection>

				<TwoCarouselsOneRow { ...carousels1 } />

				<PicsTextLink { ...pics_text_link1 } />
				<PicsTextLink { ...pics_text_link2 } />

				<TextLinkPic { ...text_link_pic } />

				<TwoCarouselsOneRow { ...carousels2 } />

				<LinksTiles heading="Jak dojechać?" links={ links_tiles } />
			</>
		)
	}
}
