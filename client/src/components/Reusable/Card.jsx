import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { FlexContainer } from '../../styled/layout.styled';
import noImage from '../../assets/svg/noImage.png'

const Card = (props) => {
    let details = {
        image: props.image,
        title: props.title,
        author: props.name,

    }
    return (
        <StyledCardContainer>
            <StyledImgContainer>
                {details.image ?
                    <StyledImg alt='' src={details.image} /> :
                    <StyledImg alt='' src={noImage} />}
            </StyledImgContainer>
            <FlexContainer
                width='100%'
                padding='0 0 10px 0'
                flexDirection='column'
                alignContent='flex-start' >
                <span>{`Title: ${details.title}`}</span>
                <span>{`author: ${details.author}`}</span>
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
    background: ${({ theme }) => theme.card.background};
    color: ${({ theme }) => theme.card.color};
    align-items: center;
    padding: 20px;
    border-radius: 10px;
`

const StyledImgContainer = styled.div`
width: 100%;
padding: 0 0 10px 0;
`

const StyledImg = styled.img`
height: 250px;
width: 100%;
`

