import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import {FlexContainer} from '../../styled/layout.styled';
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import {ADMIN_ROLE} from "../../constant";
import AuthenticatedLink from "./AuthenticatedLink";
import AuthenticatedImage from "./AuthenticatedImage";

const Card = ({id, image, bookName, author, file, pageCount, genre, onDelete, onEdit}) => {
    let splitImage = image.split('/');
    let splitFile = file.split('/');

    return (
        <StyledCardContainer width='25%' mobileWidth='50%' padding='20px 25px'>
            <AuthenticatedImage src={`http://localhost:8080/files/image/${splitImage[splitImage.length - 1]}`}/>
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
                <span style={{width: '49%', textAlign: 'end'}}>{author[0].name}</span>
                <span style={{width: '49%'}}>Genre</span>
                <span style={{width: '49%', textAlign: 'end'}}>{genre[0].name}</span>
                <span style={{width: '49%'}}>Page count</span>
                <span style={{width: '49%', textAlign: 'end'}}>{pageCount}</span>
            </FlexContainer>
            <AuthenticatedLink filename={bookName} url={`http://localhost:8080/files/book/${splitFile[splitFile.length - 1]}`}><Button width='100%'>download</Button></AuthenticatedLink>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <FlexContainer width='100%' justifyContent='space-between' margin='10px 0 0'>
                    <Button width='48%'
                            onClick={() => onEdit({id, image, bookName, author:author[0], pageCount, genre:genre[0]})}>Edit</Button>
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

