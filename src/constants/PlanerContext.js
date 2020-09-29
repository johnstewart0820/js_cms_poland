import React from 'react';
import axios from "axios";
import Planer from "../extra/Planer";

const PlanerContext = React.createContext([]);

export const PlanerContextProvider = props => {
    const [ids, setIds] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [visible, setVisible] = React.useState(true);


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