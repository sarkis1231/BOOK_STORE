import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {FlexContainer, FlexItem} from "../../styled/layout.styled";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../actions/authActions";
import Button from "../Reusable/Button";
import history from "../../utils/history";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import {NAV_ITEM} from "./config";


const Nav = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const handleLogOut = () => {
        dispatch(logOutUser());
        history.push('/');
    }
    return (
        <>
            <StyledFlexContainer
                width='50%'
                alignItems='center'
                justifyContent='space-between'
            >
                {NAV_ITEM.map(({id, name, location, role}) => (
                    <AuthorizationElem key={id} allowedRoles={role}>
                        <NavLink to={location}>{t(`${name}`)}</NavLink>
                    </AuthorizationElem>
                ))}
                {!Object.keys(isAuth).length && <NavLink to='/login'>{t('headerItem.item3')}</NavLink>}
                {Object.keys(isAuth).length ?
                    <FlexItem width='115px' onClick={() => handleLogOut()}>
                        <Button>
                            {t(`logOut`)}
                        </Button>
                    </FlexItem>
                    : null}
            </StyledFlexContainer>
        </>
    );
};


const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all .3s ease;
  padding: 60px 60px 0 60px;
  justify-content: flex-start;
  align-items: center;
`

const NavLink = styled(Link)`
  color: ${({theme}) => theme.text};
  text-decoration: none;
  margin: 0 0 20px 0;
  font-size: 20px;

  &:hover {
    text-decoration: none;
  }
`
export default Nav;