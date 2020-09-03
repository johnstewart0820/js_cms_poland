import React, { Component } from 'react';
import { API } from "../extra/API";
import SiteInfoContext from "../constants/SiteInfoContext";


import Loader from "../components/general/Loader";
import MainHeaderSection from "../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../components/carousel/TwoCarouselsOneRow";
import MapWithPinsFiltering from "../components/map/MapWithPinsFiltering";
import LoopEventsPost from "../components/events/LoopEventsPost";
import LoopNewsPost from "../components/news/LoopNewsPost";
import MainHeaderTilesSection from "../components/header/MainHeaderTilesSection";
import MainHeaderExternalLink from "../components/header/MainHeaderExternalLink";
import Weather from "../components/general/Weather";

import { HerbIcon } from "../svg/icons";
import { getSubItemSvg } from "../extra/main_menu";

export default class StartPage extends Component{

	static contextType = SiteInfoContext;
	interval = null;

	state = {
		loading: true,

		news_loading: true,
		events_loading: true,

		last_news: [],
		last_events: []
	}


	componentDidMount(){ this.getPageContent() }

	
	getPageContent = () => {

		if( !this.context ) return;

		this.lang = this.context.active_language;

		const { site_info }  = this.context;
		const page_structure = site_info?.default_content?.custom_data?.page_structure;

		const last_events_title = page_structure.module1_title;
		const last_events_cat = page_structure.module1_category;

		const last_news_title = page_structure.module2_title;
		const last_news_cat = page_structure.module2_category;

		const { map_id } = page_structure;
		const main_tiles = this.getMainTiles( page_structure );

		const external_link_title = page_structure.section5_title;
		const external_link_url = page_structure.section5_url;

		const external_link = {
			heading: external_link_title,
			href: external_link_url
		}


		this.setState({ external_link, last_news_title, main_tiles, last_events_title, map_id, loading: false }, () => {

			this.getLastEvents( last_events_cat );
			this.getLastNews( last_news_cat );
		})
	}


	getMainTiles = page_structure => {

		if ( !page_structure ) return [];
		
		const extra_classes = [ "main", "tourism", "culture", "sport" ];
		const pre_keys = [ "section1", "section2", "section3", "section4"];
		
		return pre_keys 
			.map(( pre_key, index ) => {

				const title = page_structure?.[ `${pre_key}_title` ];
				const main_href = page_structure?.[ `${pre_key}_url` ];
				const bg = page_structure?.[ `${pre_key}_photo` ];
				const extra_class = extra_classes[ index ];
				const svg = index === 0 ? <HerbIcon /> : null;

				const menu_structure = page_structure?.[ `${pre_key}_menu` ]?.structure; 
				const items = 
					menu_structure && !!menu_structure.length
						? menu_structure.map(({ item }) => ({ title: item.name, href: item.url, svg: getSubItemSvg( item.name ) }))
						: null;

				return { title, svg, main_href, bg, extra_class, items };
			});
	}


	getLastNews = categories => {
		API.getPosts(categories, 10)
			.then(res => this.setState({last_news: res.data.contents, news_loading: false}))
			.catch(console.log);
	};


	getLastEvents = categories => {

		API.get("contents/events", { params: {
			limit: 10,
			categories,
			lang: this.lang
		}})
		.then( res => {

			const { events } = res.data;
			this.setState({ last_events: events, events_loading: false });
		})
		.catch( err => { });
	}


	render(){

		const { loading, main_tiles, external_link, map_id } = this.state;
		const { last_events, last_events_title, events_loading } = this.state;
		const { last_news, last_news_title, news_loading } = this.state;

		const first_carousel = { 
			loading: events_loading, 
			path_to_all: "/events", 
			heading: last_events_title, //"Najbliższe wydarzenia", 
			items: last_events, 
			component: LoopEventsPost 
		};

		const second_carousel = { 
			loading: news_loading, 
			path_to_all: "/news", 
			heading: last_news_title, //"Ostatnie aktualności", 
			items: last_news, 
			component: LoopNewsPost 
		};

		const map = {
			map_id,
			lang: this.lang
		}

		const carousels = { first_carousel, second_carousel };		

		return (
			<>
				<MainHeaderSection> 
					
					{ loading && <Loader /> }

					{ !loading &&
						<>
							<MainHeaderTilesSection tiles={ main_tiles } />

							<div className="row">
								<MainHeaderExternalLink {...external_link } />
								<Weather />
							</div>
						</>
					}
					
				</MainHeaderSection>

				{ !loading &&
					<>
						<TwoCarouselsOneRow {...carousels } />
						<MapWithPinsFiltering {...map } />
					</> 
				}
			</>
		)
	}
}
