import React from 'react';
import User from "../extra/User";

const UserContext = React.createContext(null);

export const UserContextProvider = props => {
    const [context, setContext] = React.useState(null);

    React.useEffect(() => {
        setContext(User.getData());
    }, []);

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
