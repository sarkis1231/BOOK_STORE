import React from 'react';
import {Route} from "react-router-dom";


//Route is Accessible only when your not Authenticated Eg -> Login Page
const PublicRoute= ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (<Component {...props}/>)} />
    );
};

export default PublicRoute;