import axios from "axios";

const API_URL = "https://api.ustron.s3.netcore.pl/";
const API = axios.create({ 
	baseURL: API_URL 
});

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