import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import Button from "./Reusable/Button";
import {FlexContainer} from "../styled/layout.styled";
import {useHistory} from "react-router-dom";


const ErrorPageNumber = styled.div`
  text-align: center;
  font-size: 120px;
  color: ${({theme}) => theme.secondary_text};
  margin: 10px 0;
`;

const ErrorPageText = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${({theme}) => theme.text};
  margin: 0 0 10px 0;
`;

const ErrorPage = () => {
    const {t} = useTranslation();
    const history = useHistory();

    return (
        <>
            <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                <ErrorPageNumber>404</ErrorPageNumber>
                <ErrorPageText>{t('Page Not Found')}</ErrorPageText>
                <Button
                    width="auto"
                    margin="10px"
                    onClick={() => history.push('/')}
                >{t('Go To the main page')}
                </Button>
            </FlexContainer>
        </>
    );
};

export default ErrorPage;