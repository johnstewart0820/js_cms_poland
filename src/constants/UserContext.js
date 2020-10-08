import React from 'react';

const UserContext = React.createContext(null);

export const UserContextProvider = props => {
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
