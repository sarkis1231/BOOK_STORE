import React, {useContext} from 'react';
import styled from 'styled-components'
import Header from "./Header/Header";
import {ThemeDispatch} from "../context/ThemeContext/Context";
import Footer from "./Footer/Footer";

const Layout = ({children}) => {
    const toggleTheme = useContext(ThemeDispatch);

    return (
        <>
            <Header toggleTheme={toggleTheme}/>
            <StyledLayout>
                {children}
            </StyledLayout>
            <Footer/>
        </>
    );
};


const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
  overflow: auto;
  max-width: 1440px;
  min-height: calc(100vh - 128px);
  margin: 0 auto;

`

export default Layout;