import React, { useContext } from 'react';
import styled from 'styled-components'
import Header from "./Header/Header";
import { ThemeDispatch } from "../context/ThemeContext/Context";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
    const toggleTheme = useContext(ThemeDispatch)

    return (
        <>
            <Header toggleTheme={toggleTheme} />
            <StyledLayout>
                {children}
            </StyledLayout>
            <Footer></Footer>
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