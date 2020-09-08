import LocalStorage from "../constants/LocalStorage";

export default {
    saveData : data => localStorage.setItem(LocalStorage.Planer, data),
    getData : () => localStorage.getItem(LocalStorage.Planer),
};