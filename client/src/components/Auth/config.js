import * as yup from "yup";


export const  LoginValSchema =  yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

export const RegisterValSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password:yup.string().required(),
    confirm_password:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});