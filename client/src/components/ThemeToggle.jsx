import React from 'react';
import styled from 'styled-components'
import {ReactComponent as MoonIcon} from "../assets/svg/moon.svg";

const ThemeToggle = ({toggleTheme}) => {
    return (
        <StyledIconContainer onClick={toggleTheme}>
            <MoonIcon/>
        </StyledIconContainer>
    );
};

const StyledIconContainer = styled.div`
  cursor: pointer;
  svg {
      width: 15px;
      height: 15px;
    path {
        fill: ${({theme}) => theme.text};
    }
  }
`

export default ThemeToggle;