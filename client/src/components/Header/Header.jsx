import React, {useEffect} from 'react';
import styled from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as Logo} from "../../assets/svg/books-stack-of-three.svg";
// import Input from "../Reusable/Input";
import {useTranslation} from "react-i18next";
import DropDown from "../Reusable/DropDown";
import useDropDown from "../../hooks/useDropDown";
import LeftSideMenu from "./LeftSideMenu";
import ThemeToggle from "../ThemeToggle";

const items = [{id: 0, name: 'EN', value: 'en'}, {id: 1, name: 'AM', value: 'am'}]
const Header = ({toggleTheme}) => {
    const {i18n} = useTranslation();
    const {onCLickHandler, value} = useDropDown(false,
        JSON.parse(localStorage.getItem('lang')) || {name: 'EN', value: 'en'},
        true
    );

    useEffect(() => {
        i18n.changeLanguage(value.value);
    }, [value, i18n])
    return (
        <>
            <StyledFlexContainer>
                <LogoContainer>
                    <Logo/>
                </LogoContainer>
                <MenuSearchContainer>
                    {/*<Input type='searchBar'*/}
                    {/*       placeHolder={t('searchPlaceHolder')}/>*/}
                    <DropDown
                        items={items}
                        value={value}
                        onCLickHandler={onCLickHandler}
                    />
                    <ThemeToggle toggleTheme={toggleTheme}/>
                </MenuSearchContainer>
            </StyledFlexContainer>
            <LeftSideMenu/>
        </>
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


const MenuSearchContainer = styled(FlexContainer)`
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 80%;
`
export default Header;