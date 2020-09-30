import React from 'react';
import User from "../extra/User";
import axios from '../extra/axios';
import {useHistory} from 'react-router-dom';
import TourismRoutes from "./TourismRoutes";

const UserContext = React.createContext(null);

export const UserContextProvider = props => {
    const history = useHistory();
    const [context, setContext] = React.useState(null);



    return (
        <UserContext.Provider value={{
            ...context,
            login: setContext,
            logout: () => setContext(null),
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
