import LocalStorage from "../constants/LocalStorage";

export default {
    saveData : data => localStorage.setItem(LocalStorage.Planer, JSON.stringify(data)),
    getData : () => {
        const item = localStorage.getItem(LocalStorage.Planer);
        return item ? JSON.parse(item) : [];
    },
    deleteItem: index => {
        const itemIds = JSON.parse(localStorage.getItem(LocalStorage.Planer));
        const itemIndex = itemIds.indexOf(index);
        if (itemIds.length > 0) {
            itemIds.splice(itemIndex, 1);
            localStorage.setItem(LocalStorage.Planer, JSON.stringify(itemIds))
        }
    }
};
