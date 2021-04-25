import React, {useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {Overlay} from "../../styled/shared.styled";
import useScrollingElement from "../../hooks/useScrollingElement";
import Nav from "./Nav";

const LeftSideMenu = () => {
    const ref = useRef(null)
    const [toggleMenu, setToggleMenu] = useState(false);
    useScrollingElement(toggleMenu);
    return (
        <>
            <StyledOverlay toggleMenu={toggleMenu} onClick={() => setToggleMenu(false)}/>
            <StyledMenuContainer ref={ref} toggleMenu={toggleMenu}>
                    <Nav/>
            </StyledMenuContainer>
                <StyledButtonMenu onClick={() => setToggleMenu((prev) => !prev)}>
                    <StyledBurgerMenuWrapper trigger={toggleMenu}>
                        <span/>
                        <span/>
                        <span/>
                    </StyledBurgerMenuWrapper>
                </StyledButtonMenu>
        </>
    );
};

export default LeftSideMenu;


const StyledOverlay = styled(Overlay)`
  ${({toggleMenu}) => toggleMenu ?
        css` 
          opacity: 1;
          visibility: visible;
        ` :
        css`
          opacity: 0;
          visibility: hidden;
        `
  };
  transition: all .3s ease;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`

const StyledMenuContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 300px;
  border-radius: 0 20px 20px 0;
  background: ${({theme}) => theme.navBar.BgColor};
  z-index: 3;
   ${({toggleMenu}) => toggleMenu ?
    css` 
          opacity: 1;
          transform: translateX(0);
        ` :
    css`
          opacity: 0;
          transform: translateX(-700px);
        `
};
  transition: all .3s ease;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StyledButtonMenu = styled.div`
  position: fixed;
  left: 0;
  top: 100px;
  width: 50px;
  height: 40px;
  border-radius: 0 10px 10px 0;
  background: ${({theme}) => theme.button.bgColor};
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
  z-index: 5;
`




const StyledBurgerMenuWrapper = styled.div`
  width: 22px;
  height: 17px;
  position: relative;
  float: right;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  span{
  display: block;
  position: absolute;
  height: 2px;
  width: 20px;
  background: #FFFFFF;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
  }
  ${({trigger}) => trigger ?
    css`
  span:nth-of-type(1) {
  top: 7px;
  transform: rotate(135deg);
  }
  span:nth-of-type(2) {
  opacity: 0;
  top: 7px;
  }
  span:nth-of-type(3) {
  top: 7px;
  transform: rotate(-135deg);
  }
   `
    :
    css`
  span:nth-of-type(1) {
  top: 0;
  }
  span:nth-of-type(2) {
  top: 6px;
  }
  span:nth-of-type(3) {
  top: 12px;
  }
   `};
   @media only screen and (max-width: 970px) {
      display: block;
   }
`