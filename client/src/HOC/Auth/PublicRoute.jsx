import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";


//Route is Accessible only when your not Authenticated Eg -> Login Page
const PublicRoute= ({component: Component, ...rest}) => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route {...rest} render={(props) => (!isAuth) ?
            (<Component {...props}/>) :
            (
                <Redirect to="/404"/>
            )}
        />
    );
};

export default PublicRoute;