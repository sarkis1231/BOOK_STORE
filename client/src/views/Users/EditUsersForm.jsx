import React from 'react';
import {yupResolver} from "@hookform/resolvers/yup";
import {EditUsersSchema} from "./config";
import Input from "../../components/Reusable/Input";
import Button from "../../components/Reusable/Button";
import {useForm} from "react-hook-form";

const EditUsersForm = ({editValue, serverErrors, onSubmit}) => {
    const {register, errors, handleSubmit} =   useForm({
        resolver: yupResolver(EditUsersSchema),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name='name'
                label='Name'
                placeHolder='Name'
                value={editValue?.name}
                errors={errors || serverErrors}
                ref={register}
            />
            <Input
                name='email'
                label='Email'
                placeHolder='Email'
                value={editValue?.email}
                errors={errors}
                serverError={serverErrors}
                ref={register}
                margin='20px 0'
            />
            <Button type='submit'>Edit</Button>
        </form>
    );
};

export default EditUsersForm;