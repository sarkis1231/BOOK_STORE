import React from 'react';
import Button from './Button';
import styled, {css} from 'styled-components';
import {FlexContainer} from '../../styled/layout.styled';
import noImage from '../../assets/svg/noImage.png'

const Card = ({image, title, name}) => {
    return (
        <StyledCardContainer>
                {image ?
                    <StyledImgContainer imageUrl={image}/> :
                    <StyledImgContainer imageUrl={noImage}/>}
            <FlexContainer
                width='100%'
                padding='0 0 10px 0'
                flexDirection='column'
                alignContent='flex-start'>
                <span>{`Title: ${title}`}</span>
                <span>{`author: ${name}`}</span>
            </FlexContainer>
            <Button width='75%'>download</Button>
        </StyledCardContainer>
    )
}

export default Card;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  background: ${({theme}) => theme.card.background};
  color: ${({theme}) => theme.card.color};
  align-items: center;
  padding: 20px;
  border-radius: 32px;
`

const StyledImgContainer = styled.div`
  width: 100%;
  padding: 0 0 10px 0;
  height: 250px;
  border-radius: 20px;
  filter: drop-shadow(0px 20px 60px rgba(0, 0, 0, 0.15));
  background: ${({imageUrl}) =>  css`url(${imageUrl})`};
  background-size: 100%;
`

const StyledImg = styled.img`
 
`

