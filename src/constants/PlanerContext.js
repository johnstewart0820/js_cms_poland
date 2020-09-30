import React from 'react';
import axios from "axios";
import Planer from "../extra/Planer";
import {useLocation} from 'react-router-dom';
import TourismRoutes from "./TourismRoutes";


/* Add pages which dont need the planer button */
const noVisiblePages = [
    {
        pathname: TourismRoutes.PlanerListPage,
    },
    {
        pathname: TourismRoutes.Login,
    }
];


const PlanerContext = React.createContext([]);

export const PlanerContextProvider = props => {
    const location = useLocation();
    const [ids, setIds] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [visible, setVisible] = React.useState(true);

    // Check if page dont need the planer button, default is true
    React.useEffect(() => {
        noVisiblePages.forEach(element => {
            if (location.pathname === element.pathname) {
                setVisible(false)
            } else {
                setVisible(true)
            }
        })
    },[location.pathname]);

    React.useEffect(() => {
        if (!ids) {
            setIds(Planer.getData());
            return;
        }
        let promises = [];

        ids.forEach(id => {
            const promise = axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${id}`)
                .then(response => response.data.content);

            promises.push(promise);
        })

        Promise.all(promises).then(setData);
        Planer.saveData(ids);
    }, [ids]);


    return (
        <PlanerContext.Provider value={{
            ids: ids || [],
            data,
            add: id => setIds([...ids, id]),
            delete: index => {
                Planer.deleteItem(index);
                setIds(Planer.getData());
            },
            visible,
            setVisible,
        }}>
            {props.children}
        </PlanerContext.Provider>
    )
}

export default PlanerContext;