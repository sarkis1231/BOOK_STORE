import React from 'react'
import {GlobalStyles} from "./styled/global";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import ThemeProviderContext from "./context/ThemeContext/ThemeProviderContext";
import {Provider} from "react-redux";
import {store} from "./store";
import Routes from "./Routes";
import {setAuthToken} from "./utils/redux";
import {logOutUser, setCurrentUser} from "./actions/authActions";
import MyChatBot from "./components/ChatBot/MyChatBot";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {

    if (localStorage.token) {
        // Set auth token header auth
        setAuthToken(localStorage.token);

        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.token);

        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logOutUser());
            // store.dispatch(clearCurrentProfile());
            // Redirect to login
            window.location.href = '/login';
        }
    }


    return (
        <ThemeProviderContext>
            <GlobalStyles/>
            <Provider store={store}>
                <MyChatBot/>
                <Router>
                   <Routes/>
                </Router>
            </Provider>
        </ThemeProviderContext>
    );
}


export default App;
