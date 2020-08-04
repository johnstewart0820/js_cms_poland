import LocalStorage from "../constants/LocalStorage";

export default {
    saveToken : (token) => localStorage.setItem(LocalStorage.UserToken, token),
    getToken : () => localStorage.getItem(LocalStorage.UserToken)
};