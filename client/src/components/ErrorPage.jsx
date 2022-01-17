import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import Button from "./Reusable/Button";
import {FlexContainer} from "../styled/layout.styled";


const ErrorPageNumber = styled.div`
  text-align: center;
  font-size: 120px; 
  color: ${({theme}) => theme.secondary_text};
  margin: 10px 0;
`;

const ErrorPageText = styled.div`
  text-align: center;
  font-size: 18px;
  color: white;
  margin: 0 0 10px 0;
`;

const ErrorPage = () => {
    const {t} = useTranslation();
    return (
        <>
            <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                <ErrorPageNumber>404</ErrorPageNumber>
                <ErrorPageText>{t('Page Not Found')}</ErrorPageText>
                <Button width="auto" margin="10px">{t('Go To the main page')}</Button>
            </FlexContainer>
        </>
    );
};

export default ErrorPage;