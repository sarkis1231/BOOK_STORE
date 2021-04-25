import * as yup from "yup";

export const EditUsersSchema =yup.object().shape({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
});

export const ChangePasswordSchema = yup.object().shape({
    password: yup.string().required().min(6),
});