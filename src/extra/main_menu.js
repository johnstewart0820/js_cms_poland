import React from "react";

import { HerbIcon, EventsIcon, MountainsIcon, SpaIcon, RouteIcon, FoodOutletsIcon, BedIcon, } from "../svg/icons";
import { MuseumIcon, HouseOfCultureIcon, LibraryIcon, GalleryIcon, StarIcon } from "../svg/icons";
import { StadiumIcon, RopewaysIcon, RinkIcon, TrainerIcon, BikeIcon, TennisIcon } from "../svg/icons"

import bg2 from "../img/main-tiles/tile2.jpg";
import bg3 from "../img/main-tiles/tile3.jpg";
import bg4 from "../img/main-tiles/tile4.jpg";

const main_url = "https://ustron.s3.netcore.pl/"
const tourism_url = "http://visit.ustron.s3.netcore.pl";
const culture_url = "";
const sport_url = "";
const stay_updated_url = "";


const SUBITEMS_SVG = {
	"miasto": <HerbIcon />,
	"imprezy": <EventsIcon />,
	"cozwiedzać": <MountainsIcon />,
	"uzdrowisko": <SpaIcon />,
	"punktygastronomiczne": <FoodOutletsIcon />,
	"noclegi": <BedIcon />,
	"jakdojechać": <RouteIcon />,

	"muzeum": <MuseumIcon />,
	"miejskidomkultury": <HouseOfCultureIcon />,	
	"biblioteka": <LibraryIcon />,
	"galeria": <GalleryIcon />,
	"wydarzeniakulturalne": <StarIcon />,

	"boiskasportowe": <StadiumIcon />,
	"kolejelinowe": <RopewaysIcon />,
	"lodowisko": <RinkIcon />,
	"siłownieiplacezabaw": <TrainerIcon />,
	"rower": <BikeIcon />,
	"kortytenisowe": <TennisIcon />,
}


const getSubItemSvg = name => {
	return SUBITEMS_SVG[ name.toLowerCase().replace(/[? ]/g, "") ];
}

const MAIN_MENU = [
	{ 
		title: "Portal Turystyczny",
		main_href: tourism_url,
		bg: bg2,
		extra_class: "tourism",
		items: [
			{
				svg: <HerbIcon />,
				title: "Miasto",
				href: `${tourism_url}/city`
			},
			{
				svg: <EventsIcon />,
				title: "Imprezy",
				href: `${tourism_url}/events`
			},
			{
				svg: <MountainsIcon />,
				title: "Co zwiedzić?",
				href: `${tourism_url}/what-to-see`
			},
			{
				svg: <SpaIcon />,
				title: "Uzdrowisko",
				href: `${tourism_url}/spa`
			},
			{
				svg: <FoodOutletsIcon />,
				title: "Punkty gastronomiczne",
				href: `${tourism_url}/catering-points`
			},
			{
				svg: <BedIcon />,
				title: "Noclegi",
				href: `${tourism_url}/food-outlets`
			},
			{
				svg: <RouteIcon />,
				title: "Jak dojechać?",
				href: `${tourism_url}/how-to-get`
			}
		] 
	},
	{
		title: "KuLtura",
		main_href: culture_url,
		bg: bg3,
		extra_class: "culture",
		items: [
			{
				svg: <MuseumIcon />,
				title: "Muzeum",
				href: `${culture_url}/museum`
			},
			{
				svg: <HouseOfCultureIcon />,	
				title: "Miejski Dom Kultury",
				href: `${culture_url}/house-of-culture`
			},
			{
				svg: <LibraryIcon />,
				title: "Biblioteka",
				href: `${culture_url}/library`
			},
			{
				svg: <GalleryIcon />,
				title: "Galeria",
				href: `${culture_url}/gallery`
			},
			{
				svg: <StarIcon />,
				title: "Wydarzenia kulturalne",
				href: `${culture_url}/cuture-events`
			}
		]
	},
	{
		title: "Sport",
		main_href: sport_url,
		bg: bg4,
		extra_class: "sport",
		items: [
			{
				svg: <StadiumIcon />,
				title: "Boiska Sportowe",
				href: `${sport_url}/sport-fields`
			},
			{
				svg: <RopewaysIcon />,
				title: "Koleje Linowe",
				href: `${sport_url}/ropeways`
			},
			{
				svg: <RinkIcon />,
				title: "Lodowisko",
				href: `${sport_url}/rink`
			},
			{
				svg: <TrainerIcon />,
				title: "Siłownie i place zabaw",
				href: `${sport_url}/gyms-and-playgrounds`
			},
			{
				svg: <BikeIcon />,
				title: "Rower",
				href: `${sport_url}/bike`
			},
			{
				svg: <TennisIcon />,
				title: "Korty tenisowe",
				href: `${sport_url}/tennis`
			}
		]
	},
	{
		title: "Strona miejska",
		main_href: main_url,
		extra_class: "main"
	},
	{
		title: "Bądź na bieżąco",
		extra_class: "stay-updated",
		main_href: stay_updated_url
	}
] 


export { MAIN_MENU, getSubItemSvg, main_url, tourism_url, sport_url, culture_url, stay_updated_url };