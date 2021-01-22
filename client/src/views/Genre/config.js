import * as yup from "yup";

export const GENRE_INPUTS = [
    {
        id: 0,
        name: 'name',
        inputType: 'text',
        label: 'Genre',
        placeHolder: 'Genre'
    },
]

export const GenreSchema = yup.object().shape({
    name: yup.string().required().min(3),
});