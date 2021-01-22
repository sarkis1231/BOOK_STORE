import * as yup from "yup";

export const AUTHOR_INPUTS = [
    {
        id: 0,
        name: 'name',
        inputType: 'text',
        label: 'Author',
        placeHolder: 'Author'
    },
]
export const AuthorSchema = yup.object().shape({
    name: yup.string().required().min(3),
});

export const EditAuthorSchema = yup.object().shape({
    name: yup.string().required().min(3),
});