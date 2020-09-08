import React from 'react';
import axios from "axios";

const PlanerContext = React.createContext([]);

export const PlanerContextProvider = props => {
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/contents/events')
            .then((response) => setEvents(response.data.events))
    },[]);

    return (
        <PlanerContext.Provider value={{
            events,
            add: item => setEvents([...events, item]),
            delete: id => setEvents(events.filter(event => event.id != id)),
        }}>
            {props.children}
        </PlanerContext.Provider>
    )
}

export default PlanerContext;