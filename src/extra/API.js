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

API.getPosts = (categories, limit, page, query) => {
	if (Array.isArray(categories))
		categories = categories.join(',');

	return API.get('contents/posts', {params: {categories, limit, page, query}});
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