import React from 'react';
import { Switch } from "react-router-dom";
import PublicRoute from "./HOC/Auth/PublicRoute";
import Home from "./views/Home";
import HeaderFooterLayout from "./HOC/HeaderFooterLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Books from "./views/Books/Books";
import PrivateRoute from "./HOC/Auth/PrivateRoute";



const HL_HOME = HeaderFooterLayout(Home);
const HL_BOOKS = HeaderFooterLayout(Books);


const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact path='/' component={HL_HOME} />
            <PrivateRoute exact path='/books' component={HL_BOOKS} allowedRoles={['Admin', 'User']} />
            <PublicRoute exact path='/login' component={Login} />
            <PublicRoute exact path='/register' component={Register} />
            <PublicRoute exact path='/register' component={Register} />
        </Switch>
    );
};

export default Routes;