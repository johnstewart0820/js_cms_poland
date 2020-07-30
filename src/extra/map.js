import React from "react";
import MapPin from "../svg/components/MapPin";
import { MountainsIcon, BikeIcon, BedIcon, MapIcon, SquareIcon } from "../svg/icons";


const FILTERS = {
	
	"trip" : [ 
		{ svg: <SquareIcon />, label: "wszystkie", value: "*" },
		{ svg: <BikeIcon />, label: "trasa rowerowa", value: "bike" },
		{ svg: <MountainsIcon />, label: "atrakcji", value: "attractions" },
		{ svg: <MapIcon />, label: "obiekty turystyczne", value: "tourism" },
		{ svg: <BedIcon />, label: "noclegi", value: "bed" },
	],

	"practical-info" : [
		{ svg: <SquareIcon />, label: "wszystkie", value: "*" },
		{ svg: <MapPin color="#CE372F" />, label: "bankomaty", value: "ATM" },
		{ svg: <MapPin color="#F9C20A"/>, label: "banki", value: "banks" },
		{ svg: <MapPin color="#82C341" />, label: "poczta", value: "post_office" },
		{ svg: <MapPin color="#E1E1E1" />, label: "apteki", value: "pharmacy" },
		{ svg: <MapPin color="#052E57" />, label: "parkingi", value: "parking" },
		{ svg: <MapPin color="#CE2F94" />, label: "WiFi", value: "wifi" },
		{ svg: <MapPin color="#9F2FCE" />, label: "szkoły", value: "schools" },
		{ svg: <MapPin color="#006DDB" />, label: "place zabaw itd.", value: "playgrounds" },
		{ svg: <MapPin color="#5E0703" />, label: "AED", value: "aed" },
		{ svg: <MapPin color="#060707" />, label: "czujniki", extra_label: "wody, burzowy, ruchu, składu atmosfery", value: "sensors" },
	],

	"accommodations": [
		{ svg: <SquareIcon />, label: "wszystkie", value: "*" },
		{ svg: <MapPin color="#CE372F" />, label: "hotel", value: "hotel" },
		{ svg: <MapPin color="#F9C20A" />, label: "Pensjonat", value: "guesthouse" },
		{ svg: <MapPin color="#82C341" />, label: "Sanatorium", value: "sanatorium" },
		{ svg: <MapPin color="#E1E1E1" />, label: "Ośr. Wypoczynkowy", value: "recreation" },
		{ svg: <MapPin color="#052E57" />, label: "Kwatery Prywatne", value: "private" },
		{ svg: <MapPin color="#CE2F94" />, label: "Domek letniskowy", value: "summer_house" },
		{ svg: <MapPin color="#9F2FCE" />, label: "Pole campingowe", value: "camping" },
	]
}


const FILTERS_CONTENT = {
	"trip": {
		"*": {
			heading: "Zaplnuj podróż",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
		},
		"bike": {
			heading: "Trasa rowerowa",
			text: "Trasa rowerowa desc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
		},
		"attractions": {
			heading: "Atrakcji",
			text: "Atrakcji desc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
		},
		"tourism": {
			heading: "Obiekty turystyczne",
			text: "Obiekty turystyczne desc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
		},
		"bed": {
			heading: "Noclegi",
			text: "Noclegi desc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
		}
	},

	"practical-info": {
		"*": {
			heading: "Informacje Praktyczne",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			link_to_all: "/practical-info"
		}
	}
}

export { FILTERS, FILTERS_CONTENT };