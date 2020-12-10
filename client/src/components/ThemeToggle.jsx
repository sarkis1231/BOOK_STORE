import React from 'react';
import styled from 'styled-components'
import {ReactComponent as SunIcon} from "../assets/svg/sun.svg";
import {ReactComponent as MoonIcon} from "../assets/svg/moon.svg";

const ThemeToggle = ({theme, toggleTheme}) => {

    const isLight = theme === 'light';

    return (
        <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
           <SunIcon />
           <MoonIcon/>
        </ToggleContainer>
    );
};

const ToggleContainer = styled.button`
  background: ${({theme}) => theme.gradient};
  border: 2px solid ${({theme}) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 5px;
  position: relative;
  width:70px;
  &:focus {
    outline: none;
  }
  svg {
    height: auto;
    width: 20px;
    transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      transform: ${({lightTheme}) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
      
    }
    
    // moon icon
    &:nth-child(2) {
      transform: ${({lightTheme}) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
    @media only screen and (max-width: 970px) {
      margin-bottom: 30px;
    }
  
`;

export default ThemeToggle;