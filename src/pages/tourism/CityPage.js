import React, { Component } from 'react';
import { API, MOCK_API } from "../../extra/API";

import MainHeaderSection from "../../components/header/MainHeaderSection";
import TwoCarouselsOneRow from "../../components/carousel/TwoCarouselsOneRow";
import OneCarouseInRow from "../../components/carousel/OneCarouseInRow";
import LoopEventsPost from "../../components/events/LoopEventsPost";
import LoopNewsPost from "../../components/news/LoopNewsPost";
import Breadcrumbs from '../../components/general/Breadcrumbs';
import PicturesSlider from "../../components/slider/PicturesSlider";
import LoopPhotoReportPost from "../../components/photoreports/LoopPhotoReportPost";
import AmountsWithIcon from "../../components/general/AmountsWithIcon";
import TextLinkExpandableInfo from "../../components/general/TextLinkExpandableInfo";
import PicTextInfo from "../../components/general/PicTextInfo";
import MapWithPinsFiltering from "../../components/map/MapWithPinsFiltering";

import { PopulationIcon, SquareIcon, TotalRainfallIcon, OrchardsIcon, VegetationIcon, ForestIcon } from "../../svg/amounts-icons";
import { sample_slides as slides  } from "../../mock/slides_example";


const expanded_section = {
	loading: true,
	heading: "Witamy!",
	text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit",
	link: "/welcome",
	link_label: "dowiedz się więcej",

	expandable_label: "Pierwsza pomoc i ważne telefony",
	expandable_info: [
		{ big: "112", small: "emergency number " },
		{ big: "999", small: "ambulance" },
		{ big: "998", small: "fire brigade" },
		{ big: "997", small: "police" }
	]
}


const amounts_with_icons = {
	loading: true,
	heading: "Ustroń w liczbach",
	items: [
		{ label: "Ludność", svg: <PopulationIcon />, amount: 15345, which: "osób" },
		{ label: "Powierzchnia", svg: <SquareIcon />, amount: 5892, which: "ha" },
		{ label: "Suma opadów rocznych", svg: <TotalRainfallIcon />, amount: 1200, which: "mm" },
		{ label: "Sady", svg: <OrchardsIcon />, amount: 69 },
		{ label: "Okres wegetacyjny", svg: <VegetationIcon />, min_amount: 190, max_amount: 210, which: "dni" },
		{ label: "Lasy i grunty leśne", svg: <ForestIcon />, amount: 2725 }
	],
	path_to_all: "/amounts"
}


const pic_text_info = {
	heading: "Biuro Informacji Turystycznej",
	picture_url: "/img/pic-text-info/1.jpg",
	text: `
		<div> 
			<strong> ADRES: </strong> <br/>
			43-450 Ustroń, ul. Rynek 2 <br/>
			Tel. 33 854 26 53 <br/>
			E-mail: informacja@ustron.pl <br/>  <br/>  <br/>

			Czynna (począwszy od 04.05.2020 do odwołania):  <br/>
			Od poniedziałku do piątku 9:00 - 15:00  <br/>
			sobota 9:00 - 13:00  <br/>
			niedziela nieczynne  <br/>  <br/>

			- informacja o Ustroniu  <br/>
			- informacja o wolnych miejscach noclegowych  <br/>
			- informacja o usługach lecznictwa uzdrowiskowego  <br/>
			- sprzedaż wydawnictw turystycznych  <br/>
			- kantor wymiany walut  <br/>
			- internet, poczta elektroniczna  <br/>
			- przewozy międzynarodowe  <br/>
			- ksero
		</div>

		<div>
			<strong> ADRES: </strong> <br/>
			43-450 Ustroń, ul. Rynek 2 <br/>
			Tel. 33 854 26 53 <br/>
			E-mail: informacja@ustron.pl <br/>  <br/>  <br/>
		</div>

		<div> 
			<strong> ADRES: </strong> <br/>
			43-450 Ustroń, ul. Sanatoryjna 9 <br/>
			E-mail: informacja@ustron.pl <br/> <br/> <br/>

			Czynna (począwszy od 04.05.2020 do odwołania): <br/>
			poniedziałek - piątek nieczynne <br/>
			soboty, niedziele, święta 10:00 - 15:00 <br/> <br/>
			
			- informacja o Ustroniu <br/>
			- sprzedaż wydawnictw turystycznych
		</div>
	`,

	link: "/contact",
	link_label: "Formularz Kontaktowy"
}

export default class CityPage extends Component{

	constructor(props){
		super(props);

		this.state = {
			slides: [],

			news_loading: true,
			events_loading: true,
			photo_reports_loading: true,
			safe_ustron_loading: true,

			expanded_section: { loading: true },
			amounts_with_icons: { loading: true, items: [] },

			last_news: [],
			last_events: [],
			photo_reports: [],
			safe_ustron: []
		}
	}

	
	componentDidMount(){
		setTimeout(() => {
			this.setState({ slides });
			this.getLastNews();
			this.getLastEvents();
			this.getPhotoReports();
			this.getSafeUstron();

			this.setState({ expanded_section: {...expanded_section, loading: false }, amounts_with_icons: {...amounts_with_icons, loading: false } });
		}, 2000);
	}


	getLastNews = () => {
		MOCK_API.get("news.json")
		.then( res => this.setState({ last_news: res.data, news_loading: false }));
	}


	getLastEvents = () => {
		MOCK_API.get("events.json")
		.then( res => this.setState({ last_events: res.data, events_loading: false }));
	}


	getPhotoReports = () => {
		MOCK_API.get("photoreports.json")
		.then( res => this.setState({ photo_reports: res.data, photo_reports_loading: false }));
	}


	getSafeUstron = () => {
		MOCK_API.get("safe-ustron.json")
		.then( res => this.setState({ safe_ustron: res.data, safe_ustron_loading: false }));	
	}


	render(){

		const { slides } = this.state;
		const { last_events, events_loading } = this.state;
		const { last_news, news_loading } = this.state;
		const { photo_reports, photo_reports_loading } = this.state;
		const { safe_ustron, safe_ustron_loading } = this.state;
		const { expanded_section, amounts_with_icons } = this.state;

		const events_carousel = { loading: events_loading, path_to_all: "/events", heading: "Wydarzenia", items: last_events, component: LoopEventsPost };
		const news_carousel = { loading: news_loading, path_to_all: "/news", heading: "Ostatnie aktualności", items: last_news, component: LoopNewsPost };

		const carousels = { first_carousel: events_carousel, second_carousel: news_carousel };

		const photo_reports_carousel = {
			loading: photo_reports_loading,
			carousel: {
				heading: "Fotorelacje",
				extra_classes: "arrows-on-right",
				path_to_all: "/photo-reports",
				items: photo_reports,
				ItemComponent: LoopPhotoReportPost
			}
		};

		const safe_ustron_carousel = {
			loading: safe_ustron_loading,
			carousel: {
				heading: "Bezpieczny	Ustroń",
				extra_classes: "arrows-on-right",
				path_to_all: "/news/safe-ustron",
				items: safe_ustron,
				ItemComponent: LoopNewsPost
			}
		}

		return(
			<>
				<MainHeaderSection extra_classes="subpage">
					
					<Breadcrumbs breadcrumbs={[{ label: "Visit.ustron.pl", to: "/" }, { label: "Miasto" }]} />
					<PicturesSlider slides={ slides } />

				</MainHeaderSection>

				<TwoCarouselsOneRow { ...carousels } />

				<TextLinkExpandableInfo { ...expanded_section } />

				<OneCarouseInRow { ...photo_reports_carousel } />
				
				<AmountsWithIcon { ...amounts_with_icons }/>

				<PicTextInfo { ...pic_text_info } />

				<MapWithPinsFiltering type="practical-info" />

				<OneCarouseInRow { ...safe_ustron_carousel } />
			</>
		)
	}
};