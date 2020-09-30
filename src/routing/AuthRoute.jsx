import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import TourismRoutes from "../constants/TourismRoutes";
import axios from "../extra/axios";
import {useLocation} from 'react-router-dom';
import Loader from "../components/general/Loader";

const AuthRoute = ({component: Component, ...rest}) => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/users/validateToken')
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, [location.pathname]);

    return (
        <Route {...rest} render={matchProps => {
            if (isAuthenticated === null)
                return <Loader/>;

            return isAuthenticated
                ? <Component {...matchProps}/>
                : <Redirect to={TourismRoutes.Login}/>
        }}/>
    );
}

export default AuthRoute;