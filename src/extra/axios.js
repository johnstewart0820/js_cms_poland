import axios from 'axios';
import User from "./User";

const instance = axios.create();

instance.interceptors.request.use(config => {
    const userToken = User.getToken();
    if (userToken) {
        config.headers.Authorization = 'Bearer ' + userToken;
    }
    return config;
});

export default instance;