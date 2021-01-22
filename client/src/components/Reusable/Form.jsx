import React from 'react';
import {H1, StyledForm} from "../../styled/shared.styled";
import Input from "./Input";
import Button from "./Button";
import {FlexContainer} from "../../styled/layout.styled";

const Form = ({formTitle, inputs, handleSubmit, onSubmit, register, errors, btnName}) => {
    return (
        <FlexContainer width='100%'>
            <H1>{formTitle}</H1>
            <StyledForm onSubmit={handleSubmit && handleSubmit(onSubmit)}>
                {inputs ? inputs.map(({id, name, label, type, inputType, placeHolder}) => (
                    <Input
                        name={name}
                        label={label}
                        inputType={inputType}
                        ref={register}
                        error={errors}
                        key={id}
                        type={type}
                        placeHolder={placeHolder}
                    />
                )) : null}
                <Button margin='20px 0' type='submit'>{btnName}</Button>
            </StyledForm>
        </FlexContainer>
    );
};

export default Form;