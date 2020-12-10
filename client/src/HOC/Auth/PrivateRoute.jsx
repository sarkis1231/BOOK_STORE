import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({component:Component, allowedRoles, ...rest}) => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.user.role);

    const routePermission = (allowedRoles) ? (isAuth && allowedRoles.includes(role)) : !!isAuth;

    return (
        <Route {...rest} render={(props) => (routePermission) ?
            (<Component {...props}/>) :
            (
                <Redirect to="/login"/>
            )}
        />
    );
};

export default PrivateRoute;