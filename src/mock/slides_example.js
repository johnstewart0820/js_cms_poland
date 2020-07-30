import React from "react";
import { CameraIcon } from '../svg/icons';

const sample_slides = [
	{ url: "/img/slides/tourism-main.jpg" },
	{ 
		url: "/img/slides/tourism-1.jpg",
		top_link: "/camera",
		top_link_label: "Kamery internetowe",
		top_link_svg: <CameraIcon />
	}, 
	{ 
		url: "/img/slides/tourism-2.jpg",
		title: "Amfiteatr",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		link: "/blalba",
		link_label: "dowiedz się wiecej"
	}
]; 

const accommodations = [
	{ 
		url: "/img/slides/accommodations.jpg",
		title: "Noclegi",
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		link: "/accommodations",
		link_label: "dowiedz się wiecej"
	}
];

const gastronomy = [
	{
		url: "/img/slides/gastronomy.jpg",
		title: "Wyborne dania kuchni",
	}
]

export { sample_slides, accommodations, gastronomy }