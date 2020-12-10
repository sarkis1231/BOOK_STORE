import React from 'react'
import {GlobalStyles} from "./styled/global";

import {
    BrowserRouter as Router,
} from "react-router-dom";
import ThemeProviderContext from "./context/ThemeContext/ThemeProviderContext";
import {Provider} from "react-redux";
import {store} from "./store";
import Routes from "./Routes";

function App() {

    return (
        <ThemeProviderContext>
            <GlobalStyles/>
            <Provider store={store}>
                <Router>
                   <Routes/>
                </Router>
            </Provider>
        </ThemeProviderContext>
    );
}


export default App;
