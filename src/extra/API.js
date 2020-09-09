import axios from "axios";
import LocalStorage from "../constants/LocalStorage";

const API_URL = "https://api.ustron.s3.netcore.pl/";
const API = axios.create({ 
	baseURL: API_URL
});

API.interceptors.request.use(config => {
	config.params = config.params || {}
	config.params.lang = config.params?.lang || localStorage.getItem(LocalStorage.Locale) || 'pl';
	return config;
});

API.getPosts = ({categories, ...rest}) => {
	if (Array.isArray(categories))
		categories = categories.join(',');

	return API.get('contents/posts', {params: {categories, ...rest}});
};

API.getPost = id => API.get('contents/posts/' + id);

API.getEvents = ({categories, ...rest}) => {
	if (Array.isArray(categories))
		categories = categories.join(',');

	return API.get('contents/events', {params: {categories, ...rest}});
};

API.getPost = id => API.get('contents/events/' + id);

API.getEntities = ({categories, ...rest}) => {
	if (!Array.isArray(categories))
		categories = [categories];

	let isEvents = false;
	for (const category of categories) {
		if (category.post_type === 'events') {
			isEvents = true;
			break;
		}
	}

	return (isEvents ? API.getEvents : API.getPosts)({
		categories: categories.map(category => category.id),
		...rest,
	});
};

const MOCK_API = axios.create({
	baseURL: "/mock/"
});

const router_basename = "/";
const google_key = "AIzaSyAIzltie_bA7wStuHCcimXBlbJG5kKPYos";

export {
	API,
	MOCK_API,
	router_basename,
	google_key
};
