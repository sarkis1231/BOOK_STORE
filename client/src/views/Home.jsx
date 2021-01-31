import React from 'react';
import Button from '../components/Reusable/Button';
import {FlexContainer} from '../styled/layout.styled';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";


const Home = () => {
    const history = useHistory();
    const user = useSelector(state => state.auth.user)
    console.log(user)
    return (
        <>
            <FlexContainer flexDirection='column' padding='40px 20px' margin='0 0 20px 0'>
                <StyledHeader>Welcome to our Book-store</StyledHeader>
                <StyledHeaderTwo>About us </StyledHeaderTwo>
                <p>
                    We are an online book store that was established in 2020.<br/>
                    we give our registered users access to download a large variety of books
                    that belongs to different categories for free. <br/>
                    our goal is to help people get access to their desired books
                    from anywhere in the world easily and conveniently.

                </p>


                <StyledHeaderFour>
                    In order to access our books please register
                </StyledHeaderFour>
                {Object.keys(user).length ? null : < Button
                    type='button'
                    width='200px'
                    onClick={() => history.push('/register')}> Register
                </Button>}
                <StyledHeaderTwo>Contact us</StyledHeaderTwo>
                <StyledA href="mailto:sakooghly@gmail.com" target="_blank"
                         rel="noreferrer noopener">sakooghly@gmail.com</StyledA>
            </FlexContainer>
        </>
    );
};

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