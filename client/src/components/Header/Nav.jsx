import React, {useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import styled from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import Input from "../Reusable/Input";
import ThemeToggle from "../ThemeToggle";
import {useTranslation} from "react-i18next";
import DropDown from "../Reusable/DropDown";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../actions/authActions";

const Nav = ({theme, toggleTheme, isOpen, items, value, onCLickHandler}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <StyledFlexContainer
                width='50%'
                alignItems='center'
                justifyContent='space-between'
                isOpen={isOpen}
            >
            <Input type='searchBar'
                   searchDisplay={'flex'}
                   mobileDisplay='none'
                   placeHolder={t('searchPlaceHolder')}
            />
                <NavLink to='/'>{t('headerItem.item1')}</NavLink>
                <NavLink to='/about'>{t('headerItem.item2')}</NavLink>
                <NavLink to='/login'>{t('headerItem.item3')}</NavLink>
                <button onClick={() => dispatch(logOutUser())}>log out</button>
                <ThemeToggle toggleTheme={toggleTheme} theme={theme}/>
                <DropDown
                    items={items}
                    value={value}
                    onCLickHandler={onCLickHandler}
                    dropDownDisplay='flex'
                    mobileDisplay='none'
                />
            </StyledFlexContainer>
        </>
    );
};


const StyledFlexContainer = styled(FlexContainer)`
  padding: 0;
  @media only screen and (max-width: 970px) {
    position: fixed;
    width: 100%;
    height: 100vh;
    left: ${({isOpen}) => isOpen ? 0 :  '150%'};
    right: 0;
    top: 75px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.body};
    transition: all .3s ease;
    padding: 60px 60px 0 60px;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
  }
`

const NavLink = styled(Link)`
  color: ${({theme}) => theme.text};
  text-decoration: none;
  font-size: 14px;
  @media only screen and (max-width: 970px) { 
    margin: 0 0 20px 0;
    font-size: 20px;
  }
`
export default Nav;