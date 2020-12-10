import React, {useContext} from 'react';
import styled from 'styled-components'
import Header from "./Header/Header";
import {ThemeContext, ThemeDispatch} from "../context/ThemeContext/Context";

const Layout = ({ children, header }) => {
    const toggleTheme = useContext(ThemeDispatch)
    const theme = useContext(ThemeContext);

    return (
        <>
            {header ?
            <>
                <Header toggleTheme={toggleTheme} theme={theme}/>
                <StyledLayout>
                    {children}
                </StyledLayout>
            </>
                :
                <StyledLayout>
                    {children}
                </StyledLayout>
            }

        </>
    );
};


const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`

export default Layout;