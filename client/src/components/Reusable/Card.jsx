import React from 'react';
import Button from './Button';
import styled, {css} from 'styled-components';
import {FlexContainer} from '../../styled/layout.styled';
import noImage from '../../assets/svg/noImage.png'

const Card = ({image, bookName, author, file}) => {
    let splitImage = image.split('/');
    let splitFile = file.split('/')
    return (
        <StyledCardContainer width='25%' mobileWidth='45%' padding='20px 25px'>
            {image ?
                <StyledImgContainer
                    imageUrl={` http://localhost:8080/files/image/${splitImage[splitImage.length - 1]}`}/> :
                <StyledImgContainer imageUrl={noImage}/>}
            <FlexContainer
                width='100%'
                padding='0 0 10px 0'
                flexDirection='column'
                alignContent='flex-start'>
                <span>Book name {bookName}</span>
                <span>Author {author.name}</span>
            </FlexContainer>
            <StyledA href={`http://localhost:8080/files/book/${splitFile[splitFile.length - 1]}`} target="_blank"
                     rel="noreferrer noopener" download>
                <Button width='100%'>download</Button>
            </StyledA>
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
  background: ${({imageUrl}) => css`url(${imageUrl})no-repeat center`};
  background-size: 100%;
  margin: 0 0 20px;

`
const StyledA = styled.a`
  cursor: pointer;
  width: 100%;
`
