import React from 'react';
import {H1, StyledForm} from "../../styled/shared.styled";
import Input from "./Input";
import Button from "./Button";
import {FlexContainer} from "../../styled/layout.styled";
import {useTranslation} from "react-i18next";

const Form = ({formTitle, inputs, handleSubmit, onSubmit, register, errors, btnName, id}) => {
    const {t} = useTranslation()
    return (
        <FlexContainer width='100%'>
            <H1>{formTitle}</H1>
            <StyledForm onSubmit={handleSubmit && handleSubmit(onSubmit)} id={id ? `${id}_form` : null}>
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
                        id={id ? `${id}_input` : null}
                    />
                )) : null}
                <Button margin='20px 0' type='submit' id={id ? `${id}_btn` : null}>{btnName}</Button>
            </StyledForm>
        </FlexContainer>
    );
};

export default Form;