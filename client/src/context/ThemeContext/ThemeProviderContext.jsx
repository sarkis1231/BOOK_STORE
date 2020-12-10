import React from 'react';
import {ThemeContext, ThemeDispatch} from "./Context";
import useDarkMode from "../../hooks/useDarkMode";
import {ThemeProvider} from "styled-components";
import {darkTheme, lightTheme} from "../../styled/theme";

const ThemeProviderContext = ({children}) => {
    const {theme, toggleTheme} = useDarkMode();
    return (
        <ThemeContext.Provider value={theme}>
            <ThemeDispatch.Provider  value={toggleTheme}>
                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                    {children}
                </ThemeProvider>
            </ThemeDispatch.Provider>
        </ThemeContext.Provider>
    );
};

export default ThemeProviderContext;