import React from 'react';
import {Switch} from "react-router-dom";
import PublicRoute from "./HOC/Auth/PublicRoute";
import Home from "./views/Home";
import HeaderFooterLayout from "./HOC/HeaderFooterLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./HOC/Auth/PrivateRoute";


const HL_HOME = HeaderFooterLayout(Home);

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/' component={HL_HOME} allowedRoles={['User', 'Admin']}/>
            <PublicRoute exact path='/login' component={Login}/>
            <PublicRoute exact path='/register' component={Register}/>
        </Switch>
    );
};

export default Routes;