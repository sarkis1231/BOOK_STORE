import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {H1, StyledForm} from "../../styled/shared.styled";
import Input from "../Reusable/Input";
import Button from "../Reusable/Button";
import styled from "styled-components";
import {FlexContainer} from "../../styled/layout.styled";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginValSchema} from "./config";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../actions/authActions";


const Login = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const isAuth  = useSelector(state => state.auth.isAuthenticated);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(LoginValSchema)
    });

    const dispatch = useDispatch();

    const onSubmit = (values) => {
        axios.post('/users/login', values).then(res => {
            if(res) {
                dispatch(loginUser(res));
                history.push('/home');
            }
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        if(Object.keys(isAuth).length) {
           history.push('/home')
        }
    }, [isAuth, history])



    return (
        <StyledFlexContainer>
            <H1>{t('login')}</H1>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name='email'
                    margin='0 0 20px 0'
                    label={t('email')}
                    inputType='email'
                    ref={register}
                    error={errors}

                />
                <Input
                    name='password'
                    label={t('password')}
                    type='password'
                    margin='0 0 30px 0'
                    inputType='password'
                    ref={register}
                    error={errors}
                />
                <Button type='submit' margin='0 0 20px 0'>{t('login')}</Button>
                <Button type='button' onClick={() => history.push('/register')} >{t('register')}</Button>
            </StyledForm>
        </StyledFlexContainer>
    );
};


export default Login;


const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
`