import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import TourismRoutes from "../constants/TourismRoutes";
import axios from "../extra/axios";
import User from "../extra/User";
import UserContext from "../constants/UserContext";
import {useHistory} from 'react-router-dom';

const AuthRoute = ({component: Component, ...rest}) => {
    const userContext = React.useContext(UserContext);
    const history = useHistory();

    React.useEffect(() => {
        axios.get('https://api.ustron.s3.netcore.pl/users/validateToken')
            .then((res) => {
                console.log(res)
                userContext.login(User.getData());
            })
            .catch((err) => {
                console.log(err)
                if (err) {
                    userContext.login(User.clearData());
                    history.push(TourismRoutes.Login);
                }
            })
    },[]);

    return (
        <Route {...rest} render={matchProps => {
            return rest.user
                ? <Component {...matchProps}/>
                : <Redirect to={TourismRoutes.Login}/>
        }}/>
    )
}

export default AuthRoute;