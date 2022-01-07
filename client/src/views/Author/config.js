import * as yup from "yup";

export const AUTHOR_INPUTS = [
    {
        id: 'add_genre',
        name: 'name',
        inputType: 'text',
        label: 'author.author',
        placeHolder: 'author.author'
    },
]
export const AuthorSchema = yup.object().shape({
    name: yup.string().required().min(3),
});

export const EditAuthorSchema = yup.object().shape({
    name: yup.string().required().min(3),
});