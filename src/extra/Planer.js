import LocalStorage from "../constants/LocalStorage";

export default {
    saveData : data => localStorage.setItem(LocalStorage.Planer, JSON.stringify(data)),
    getData : () => JSON.parse(localStorage.getItem(LocalStorage.Planer)),
};