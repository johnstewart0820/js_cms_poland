import React from 'react';
import axios from "axios";
import Planer from "../extra/Planer";

const PlanerContext = React.createContext([]);

export const PlanerContextProvider = props => {
    const [ids, setIds] = React.useState([]);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        let promises = [];

        ids.forEach(id => {
            const promise = axios.get(`https://api.ustron.s3.netcore.pl/contents/posts/${id}`)
                .then(response => response.data.content);

            promises.push(promise);
        })

        Promise.all(promises).then(setData);
        Planer.saveData(ids);
    }, [ids]);

    React.useEffect(() => {
        setData(Planer.getData())
    },[ids])

    return (
        <PlanerContext.Provider value={{
            ids,
            data,
            add: id => setIds([...ids, id]),
            delete: id => setIds(ids.filter(event => event.id != id)),
        }}>
            {props.children}
        </PlanerContext.Provider>
    )
}

export default PlanerContext;