import Select from "../components/form/Select";
import InputComponent from "../components/form/InputComponent";
import {DatePicker} from "../components/form/DatePicker";
import moment from "moment";

const NEWS = [
	{ 
		label: "Kategoria",
		name: "category",
		id: "news-category",
		options: [
			{ value: 1, label: "Kategoria 1" },
			{ value: 2, label: "Kategoria 2" },
			{ value: 3, label: "Kategoria 3" },
			{ value: 4, label: "Kategoria 4" },
			{ value: 5, label: "Kategoria 5" },
			{ value: 6, label: "Kategoria 6" },
		],
		Component: Select
	}
];


const PHOTO_REPORTS = [
	{ 
		label: "Kategoria",
		name: "category",
		id: "news-category",
		options: [
			{ value: 1, label: "Kategoria 1" },
			{ value: 2, label: "Kategoria 2" },
			{ value: 3, label: "Kategoria 3" },
			{ value: 4, label: "Kategoria 4" },
			{ value: 5, label: "Kategoria 5" },
			{ value: 6, label: "Kategoria 6" },
		],
		Component: Select
	}
];


const ACCOMMODATIONS = [
	{
		label: "Rodzaj",
		name: "type",
		options: [
			{ value: "hotel", label: "Hotel"},
			{ value: "guesthouse", label: "Pensjonat"},
			{ value: "sanatorium", label: "Sanatorium"},
			{ value: "recreation", label: "Ośr. Wypoczynkowy"},
			{ value: "private", label: "Kwatery Prywatne"},
			{ value: "summer_house", label: "Domek letniskowy"},
			{ value: "camping", label: "Pole campingowe"},

		],
		Component: Select
	},
	{
		label: "Polecane dla",
		name: "recommended",
		options: [
			{ value: "family_with_kids", label: "Rodziny z dziećmi"},
			// { value: "", label: ""},
			// { value: "", label: ""},
			// { value: "", label: ""},
		],
		Component: Select
	},
	{
		label: "Przedział cenowy",
		name: "price_range",
		options: [
			{ value: "low_prices", label: "Niskie ceny"},
			// { value: "", label: ""},
			// { value: "", label: ""},
			// { value: "", label: ""}
		],
		Component: Select
	},
	{
		label: "Udogodnienia",
		name: "amenities",
		options: [
			{ value: "food_delivery", label: "Jedzenie na dowóz"},
			// { value: "", label: ""},
			// { value: "", label: ""},
			// { value: "", label: ""}
		],
		Component: Select
	}
];

const WHAT_TO_VISIT = [
	{
		label: "Polecane dla",
		name: "recommended_for",
		options: [
			{ value: "family_with_kids", label: "Rodziny Z Dziećmi"},
		],
		Component: Select
	},
	{
		label: "Typ Atrakcji",
		name: "type",
		options: [
			{ value: "bike_lane", label: "Trasa Rowerowa"},
		],
		Component: Select
	},
	{
		label: "Przedział cenowy",
		name: "price_range",
		options: [
			{ value: "low_prices", label: "Niskie Ceny"},
		],
		Component: Select
	},
];

const EVENTS = [
	{
		fieldName: 'NAZWA WYDARZENIA',
		name: 'eventName',
		Component: InputComponent
	},
	{
		label: 'OD',
		name: 'from',
		Component: DatePicker
	},
	{
		label: 'DO',
		name: 'to',
		Component: DatePicker
	},
	{
		label: 'LOKALIZACJA',
		name: 'locale',
		extra_classes: 'select-small',
		selectImageColor: 'green',
		options: [
			{ value: "low_prices", label: "Niskie Ceny"},
		],
		Component: Select
	},
	{
		label: 'KATEGORIA',
		name: 'category',
		selectImageColor: 'green',
		extra_classes: 'select-small',
		options: [
			{ value: "low_prices", label: "Niskie Ceny"},
		],
		Component: Select
	}
];

const LOOP_SEARCH_INPUTS = {
	"news": NEWS,
	"photo-reports": PHOTO_REPORTS,
	"accommodations": ACCOMMODATIONS,
	"what-to-visit": WHAT_TO_VISIT,
	"events" : EVENTS
}


export default LOOP_SEARCH_INPUTS;