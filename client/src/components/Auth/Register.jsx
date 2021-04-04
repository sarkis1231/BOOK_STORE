import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {H1, StyledForm} from "../../styled/shared.styled";
import Input from "../Reusable/Input";
import Button from "../Reusable/Button";
import styled from "styled-components";
import {FlexContainer} from "../../styled/layout.styled";
import {useForm} from "react-hook-form";
import {RegisterValSchema} from "./config";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import {useSelector} from "react-redux";
import useAlert from "../../hooks/useAlert";
import Alert from "../Reusable/Alert";


const Register = () => {

    const { t } = useTranslation();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(RegisterValSchema)
    });
    const isAuth  = useSelector(state => state.auth.isAuthenticated);
    const [alert,setAlert] = useAlert();

    const onSubmit = (values) => {
        axios.put('/users/register', values).then(res => {
            if(res) {
                history.push('/login');
            }
        }).catch(e => {
            setAlert({show: true, message:e.response.data.data.email,severity: 'error' })
        })
    }

    useEffect(() => {
        if(Object.keys(isAuth).length) {
            history.push('/')
        }
    }, [isAuth, history])

    return (
        <StyledFlexContainer>
            <H1>{t('register')}</H1>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Input
                    inputType='text'
                    name='name'
                    label={t('name')}
                    margin='0 0 20px 0'
                    error={errors}
                    ref={register}
                />
                <Input
                    inputType='email'
                    name='email'
                    label={t('email')}
                    margin='0 0 20px 0'
                    error={errors}
                    ref={register}
                />
                <Input
                    inputType='password'
                    name='password'
                    label={t('password')}
                    margin='0 0 20px 0'
                    error={errors}
                    ref={register}
                />
                <Input
                    inputType='password'
                    name='confirm_password'
                    label={t('confirmPassword')}
                    margin='0 0 30px 0'
                    error={errors}
                    ref={register}
                />

                <Button type='submit' margin='0 0 20px 0'>{t('register')}</Button>
                <Button type='button' onClick={() => history.push('/login')}>{t('login')}</Button>
            </StyledForm>
            <Alert show={alert.show} message={alert.message} setShow={setAlert} severity={alert.severity}/>
        </StyledFlexContainer>
    );
};

export default Register;

const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  height: 100vh;
  overflow: auto;
  justify-content: center;
  flex-direction: column;
`