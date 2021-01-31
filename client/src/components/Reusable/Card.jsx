import React from 'react';
import Button from './Button';
import styled, {css} from 'styled-components';
import {FlexContainer} from '../../styled/layout.styled';
import noImage from '../../assets/svg/noImage.png'

const Card = ({image, bookName, author}) => {
    console.log(image)
    return (
        <StyledCardContainer width='25%' mobileWidth='45%' padding='20px 25px'>
            {!image ?
                <StyledImgContainer imageUrl={image}/> :
                <StyledImgContainer imageUrl={noImage}/>}
            <FlexContainer
                width='100%'
                padding='0 0 10px 0'
                flexDirection='column'
                alignContent='flex-start'>
                <span>Book name {bookName}</span>
                <span>Author {author}</span>
            </FlexContainer>
            <Button width='100%'>download</Button>
        </StyledCardContainer>
    )
}

export default Card;

const StyledCardContainer = styled(FlexContainer)`
  flex-direction: column;
  background: ${({theme}) => theme.card.background};
  color: ${({theme}) => theme.card.color};
  align-items: center;
  border-radius: 32px;
`

const StyledImgContainer = styled.div`
  width: 100%;
  height: 248px;
  border-radius: 20px;
  filter: drop-shadow(0px 20px 60px rgba(0, 0, 0, 0.15));
  background: ${({imageUrl}) => css`url(${imageUrl})no-repeat `};
  background-size: 100% 100%;
  margin: 0 0 20px;

`

