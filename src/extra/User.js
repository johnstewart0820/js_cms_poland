import LocalStorage from "../constants/LocalStorage";

export default {
    saveData : data => localStorage.setItem(LocalStorage.UserToken, data),
    getData : () => JSON.parse(localStorage.getItem(LocalStorage.UserToken)),
};