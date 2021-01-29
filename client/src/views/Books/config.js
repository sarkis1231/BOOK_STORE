import * as yup from "yup";

export const AddBookSchema = yup.object().shape({
    name: yup.string().required().min(3),
    genre: yup.string().required(),
    authors: yup.string().required(),
});