import React from 'react';
import { Switch } from "react-router-dom";
import PublicRoute from "./HOC/Auth/PublicRoute";
import Home from "./views/Home";
import HeaderFooterLayout from "./HOC/HeaderFooterLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Books from "./views/Books/Books";
import PrivateRoute from "./HOC/Auth/PrivateRoute";
import Genre from "./views/Genre/Genre";
import Users from "./views/Users/Users";
import {ADMIN_ROLE, ALL_ROLES} from "./constant";
import Author from "./views/Author/Author";
import Permissions from "./views/Permissions/Permissions";



const HL_HOME = HeaderFooterLayout(Home);
const HL_BOOKS = HeaderFooterLayout(Books);
const HL_ADDGenre = HeaderFooterLayout(Genre)
const HL_USERS = HeaderFooterLayout(Users)
const HL_AUTHOR = HeaderFooterLayout(Author)
const HL_Permissions = HeaderFooterLayout(Permissions)


const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact path='/' component={HL_HOME} />
            <PrivateRoute exact path='/books' component={HL_BOOKS} allowedRoles={ALL_ROLES} />
            <PrivateRoute exact path='/genre' component={HL_ADDGenre} allowedRoles={ADMIN_ROLE} />
            <PrivateRoute exact path='/users' component={HL_USERS} allowedRoles={ADMIN_ROLE} />
            <PrivateRoute exact path='/author' component={HL_AUTHOR} allowedRoles={ADMIN_ROLE} />
            <PrivateRoute exact path='/permissions' component={HL_Permissions} allowedRoles={ADMIN_ROLE} />
            <PublicRoute exact path='/login' component={Login} />
            <PublicRoute exact path='/register' component={Register} />
        </Switch>
    );
};

export default Routes;