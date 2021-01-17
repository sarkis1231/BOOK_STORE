import React from "react";
import styled from 'styled-components';

const Footer = () => {

    return (
        <>
            <StyledFooterContainer>
                <StyledFooterParagraph> Copy right 2021 All rights reserved </StyledFooterParagraph>
            </StyledFooterContainer>
        </>

    )
}

export default Footer;

const StyledFooterContainer = styled.div`
width: 100%;
justify-content: center;
display: flex;
background: ${({ theme }) => theme.footer.background};
align-items: center;
border-top: ${({ theme }) => theme.footer.borderTop};
position: absolute;
bottom: 0;

`
const StyledFooterParagraph = styled.p`
margin-top: revert;
`