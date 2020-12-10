import React from 'react'
import {GlobalStyles} from "./styled/global";

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import ThemeProviderContext from "./context/ThemeContext/ThemeProviderContext";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {

    return (
        <Router>
            <ThemeProviderContext>
                <GlobalStyles/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
            </ThemeProviderContext>
        </Router>
    );
}


export default App;
