import React from 'react';
import Button from './Button';
import styled, {css} from 'styled-components';
import {FlexContainer} from '../../styled/layout.styled';
import noImage from '../../assets/svg/noImage.png'
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import {ADMIN_ROLE} from "../../constant";

const Card = ({id, image, bookName, author, file, pageCount, genre, onDelete, onEdit}) => {
    let splitImage = image.split('/');
    let splitFile = file.split('/');

    return (
        <StyledCardContainer width='25%' mobileWidth='50%' padding='20px 25px'>
            {image ?
                <StyledImgContainer
                    imageUrl={` http://localhost:8080/files/image/${splitImage[splitImage.length - 1]}`}/> :
                <StyledImgContainer imageUrl={noImage}/>}
            <FlexContainer
                width='100%'
                padding='0 0 10px 0'
                flexDirection='row'
                flexWrap='wrap'
                alignContent='align-center'
                justifyContent='space-between'
            >
                <span style={{width: '49%'}}>Book name</span>
                <span style={{width: '49%', textAlign: 'end'}}>{bookName}</span>
                <span style={{width: '49%'}}>Author</span>
                <span style={{width: '49%', textAlign: 'end'}}>{author.name}</span>
                <span style={{width: '49%'}}>Genre</span>
                <span style={{width: '49%', textAlign: 'end'}}>{genre.name}</span>
                <span style={{width: '49%'}}>Page count</span>
                <span style={{width: '49%', textAlign: 'end'}}>{pageCount}</span>
            </FlexContainer>
            <StyledA href={`http://localhost:8080/files/book/${splitFile[splitFile.length - 1]}`} target="_blank"
                     rel="noreferrer noopener" download>
                <Button width='100%'>download</Button>
            </StyledA>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <FlexContainer width='100%' justifyContent='space-between' margin='10px 0 0'>
                    <Button width='48%'
                            onClick={() => onEdit({id, image, bookName, author, pageCount, genre})}>Edit</Button>
                    <Button width='48%' onClick={() => onDelete({id, bookName})}>Delete</Button>
                </FlexContainer>
            </AuthorizationElem>
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
  width: 30%;
  margin-bottom: 20px;
  @media only screen and (max-width: 970px) {
    width: 49%;
  }
  @media only screen and (max-width: 521px) {
    width: 100%;
  }
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
