import * as yup from "yup";

export const GENRE_INPUTS = [
    {
        id: 'add_genre',
        name: 'name',
        inputType: 'text',
        label: 'genre.genre',
        placeHolder: 'genre.genre'
    },
]

export const GenreSchema = yup.object().shape({
    name: yup.string().required().min(3),
});