import axios from "axios";

const API_URL = "/";
const API = axios.create({ 
	baseURL: API_URL 
});

const router_basename = "/";
const google_key = "AIzaSyAIzltie_bA7wStuHCcimXBlbJG5kKPYos";

export {
	API,
	router_basename,
	google_key
};