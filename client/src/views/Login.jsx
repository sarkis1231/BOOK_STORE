import React from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout";
import {FlexContainer} from "../styled/layout.styled";
import Input from "../components/Reusable/Input";
import Button from "../components/Reusable/Button";
import {useTranslation} from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <StyledFlexContainer>
                <StyledForm>
                    <Input
                        margin='0 0 20px 0'
                        placeHolder='Login'
                        label={t('email')}
                    />
                    <Input
                        label={t('password')}
                        type='password'
                        margin='0 0 30px 0'
                    />
                    <Button type='button' onClick={() => console.log('clicked')}>{t('login')}</Button>
                </StyledForm>
            </StyledFlexContainer>
        </Layout>
    );
};

const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  justify-content: center;
`

const StyledForm = styled.form`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  align-items: center;
  padding: 120px 30px 0 30px;
`

export default Login;