import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as Logo} from "../../assets/svg/books-stack-of-three.svg";
import Nav from "./Nav";
import Input from "../Reusable/Input";
import {useTranslation} from "react-i18next";
import DropDown from "../Reusable/DropDown";
import useDropDown from "../../hooks/useDropDown";

const items = [{id:0, name:'EN', value:'en'},{id:1, name:'AM', value:'am'}]
const Header = ({theme, toggleTheme}) => {
    const [trigger, setTrigger] = useState(false);
    const {t, i18n} = useTranslation();
    const {  onCLickHandler, value}  =  useDropDown(false,
        JSON.parse(localStorage.getItem('lang')) || {name:'EN', value:'en'},
        true
    );

    useEffect(() => {
        i18n.changeLanguage(value.value);
    }, [value, i18n])
    return (
        <StyledFlexContainer>
            <LogoContainer>
                <Logo/>
            </LogoContainer>
            <Nav
                toggleTheme={toggleTheme}
                theme={theme}
                isOpen={trigger}
                value={value}
                items={items}
                onCLickHandler={onCLickHandler}
            />

            <MenuSearchContainer>
                <Input type='searchBar'
                       placeHolder={t('searchPlaceHolder')} searchDisplay={'none'} mobileDisplay='flex'/>
                <DropDown
                    items={items}
                    value={value}
                    onCLickHandler={onCLickHandler}
                    dropDownDisplay='none'
                    mobileDisplay='flex'
                />
                <StyledBurgerMenuWrapper
                    trigger={trigger}
                    onClick={() => setTrigger(prev => !prev)}
                >
                    <span/>
                    <span/>
                    <span/>
                </StyledBurgerMenuWrapper>
            </MenuSearchContainer>
        </StyledFlexContainer>
    );
};


const StyledFlexContainer = styled(FlexContainer)`
   width: 100%;
   padding: 15px;
   align-items: center;
   justify-content: space-between;
   background: ${({theme}) => theme.navBar.BgColor};
   border-bottom: ${({theme}) => `1px solid ${theme.toggleBorder}`};
   
`


const LogoContainer = styled.div`
  svg {
    width: 40px;
    height: 40px;
    fill: ${({theme}) => theme.text};
  }
`

const StyledBurgerMenuWrapper = styled.div`
  display: none;
  width: 22px;
  height: 17px;
  position: relative;
  float: right;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  margin-left: 20px;
  span{
  display: block;
  position: absolute;
  height: 2px;
  width: 20px;
  background: ${({theme}) => theme.text};
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

const MenuSearchContainer = styled(FlexContainer)`
    display: none;
   @media only screen and (max-width: 970px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70%;
   }
`
export default Header;