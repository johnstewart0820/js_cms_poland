import LocalStorage from "../constants/LocalStorage";

export default {
    saveData : data => localStorage.setItem(LocalStorage.Planer, JSON.stringify(data)),
    getData : () => {
        const item = localStorage.getItem(LocalStorage.Planer);
        return item ? JSON.parse(item) : [];
    },
};