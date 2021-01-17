import React from 'react';
import {useSelector} from "react-redux";



const AuthorizationElem = ({allowedRoles, children}) => {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector (state => state.auth.user.role);

    if (isAuth && allowedRoles && allowedRoles.includes(role)) {
        return (
            <>
                {children}
            </>
        );
    } else {
        return null;
    }
};

export default AuthorizationElem;