import React from 'react';
import {Switch} from "react-router-dom";
import PublicRoute from "./HOC/Auth/PublicRoute";
import Login from "./views/Login";
import Home from "./views/Home";
import HeaderFooterLayout from "./HOC/HeaderFooterLayout";

const HL_HOME = HeaderFooterLayout(Home);

const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact path='/' component={HL_HOME}/>
            <PublicRoute exact path='/login' component={Login}/>
        </Switch>
    );
};

export default Routes;