import React, {useContext} from 'react';
import styled from 'styled-components'
import {ThemeContext} from "../context/ThemeContext/Context";
import {ReactComponent as MoonIcon} from "../assets/svg/moon.svg";
import {ReactComponent as SunIcon} from "../assets/svg/sun.svg";


const ThemeToggle = ({toggleTheme}) => {
    const theme = useContext(ThemeContext);

    return (
        <StyledIconContainer onClick={toggleTheme}>
            {theme === 'light'? <SunIcon/> :<MoonIcon/>}
        </StyledIconContainer>
    );
};

const StyledIconContainer = styled.div`
  cursor: pointer;
  svg {
      width: 20px;
      height: 20px;
  }
`

export default ThemeToggle;