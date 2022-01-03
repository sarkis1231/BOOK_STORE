import React from 'react';
import Button from '../components/Reusable/Button';
import {FlexContainer} from '../styled/layout.styled';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";


const Home = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const user = useSelector(state => state.auth.user)
    return (
        <>
            <FlexContainer flexDirection='column' padding='40px 20px' margin='0 0 20px 0'>
                <StyledHeader>{t("homePage.pageTitle")}</StyledHeader>
                <StyledHeaderTwo>{t("homePage.aboutUs")} </StyledHeaderTwo>
                <p>
                    {t("homePage.introduction")}
                </p>


                <StyledHeaderFour>
                    {t("homePage.inOrder")}
                </StyledHeaderFour>
                {Object.keys(user).length ? null :
                    <FlexContainer alignItems='center' justifyContent='flex-start'>
                        <Button
                            type='button'
                            width='200px'
                            onClick={() => history.push('/register')}>
                            {t("register")}
                        </Button>
                        <p style={{margin: '0 20px'}}>{t("homePage.or")}</p>
                        <Button
                            type='button'
                            width='200px'
                            onClick={() => history.push('/login')}
                            id="login"
                        >
                            {t("login")}
                        </Button>
                    </FlexContainer>
                }
                <StyledHeaderTwo>{t("homePage.contactUs")}</StyledHeaderTwo>
                <StyledA href="mailto:sakooghly@gmail.com" target="_blank"
                         rel="noreferrer noopener">sakooghly@gmail.com</StyledA>
            </FlexContainer>
        </>
    );
}
;

export default Home;


const StyledHeader = styled.h1`
text-align: center;

`

const StyledHeaderTwo = styled.h2`
padding: 40px 0 20px 0;

`

const StyledHeaderFour = styled.h4`
padding: 40px 0 20px 0;

`
const StyledA = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.text};

  &:hover {
    color: ${({theme}) => theme.text};
  }
`