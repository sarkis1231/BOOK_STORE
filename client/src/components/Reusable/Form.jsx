import React from 'react';
import {H1, StyledForm} from "../../styled/shared.styled";
import Input from "./Input";
import Button from "./Button";
import {FlexContainer} from "../../styled/layout.styled";
import {useTranslation} from "react-i18next";

const Form = ({formTitle, inputs, handleSubmit, onSubmit, register, errors, btnName}) => {
    const {t} = useTranslation()
    return (
        <FlexContainer width='100%'>
            <H1>{formTitle}</H1>
            <StyledForm onSubmit={handleSubmit && handleSubmit(onSubmit)}>
                {inputs ? inputs.map(({id, name, label, type, inputType, placeHolder}) => (
                    <Input
                        name={name}
                        label={t(`${label}`)}
                        inputType={inputType}
                        ref={register}
                        error={errors}
                        key={id}
                        type={type}
                        placeHolder={t(`${placeHolder}`)}
                    />
                )) : null}
                <Button margin='20px 0' type='submit'>{btnName}</Button>
            </StyledForm>
        </FlexContainer>
    );
};

export default Form;