import React, { Component } from 'react';
import { API } from "../extra/API";
import { SITES_DOMAIN } from "../extra/site_settings";

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

	state = {
		loading: true,

		news_loading: true,
		events_loading: true,

		last_news: [],
		last_events: []
	}


	componentDidMount(){ this.getSiteInfo() }


	getSiteInfo = () => {
		API.get(`sites/getInfo?domain=${ SITES_DOMAIN[ "MAIN" ] }`)
		.then( res => {

			const { info } = res.data;
			const page_structure = info?.default_content?.custom_data?.page_structure;

			console.log( page_structure );

			const last_events_title = page_structure.module1_title;
			const last_events_cat = page_structure.module1_category;

			const last_news_title = page_structure.module2_title;
			const last_news_cat = page_structure.module2_category;

			const { map_id } = page_structure;
			const main_tiles = this.getMainTiles( page_structure );

			console.log(main_tiles);

			this.setState({ loading: false, last_news_title, main_tiles, last_events_title, map_id }, () => {

				this.getLastEvents( last_events_cat );
				this.getLastNews( last_news_cat );
			})

		})
		.catch( err => { })
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

		API.get("contents/posts", { params: {
			limit: 10,
			categories
		}})
		.then( res => {
			
			const last_news = res.data.contents;
			this.setState({ last_news, news_loading: false })
		})
		.catch( err => { })
	}


	getLastEvents = categories => {

		API.get("contents/events?limit=5", { params: {
			limit: 10,
			categories
		}})
		.then( res => {

			const { events } = res.data;

			this.setState({ last_events: events, events_loading: false });
		})
		.catch( err => { });
	}


	render(){

		const { loading, main_tiles } = this.state;
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

		const carousels = { first_carousel, second_carousel };		

		return (
			<>
				<MainHeaderSection> 
					
					{ loading && <Loader /> }

					{ !loading &&
						<>
							<MainHeaderTilesSection tiles={ main_tiles } />

							<div className="row">
								<MainHeaderExternalLink />
								<Weather />
							</div>
						</>
					}
					
				</MainHeaderSection>

				{ !loading &&
					<>
						<TwoCarouselsOneRow {...carousels } />
						<MapWithPinsFiltering type="trip" />
					</> 
				}
			</>
		)
	}
}
