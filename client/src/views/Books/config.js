import * as yup from "yup";

export const AddBookSchema = yup.object().shape({
    name: yup.string().required().min(3),
    pageCount: yup.string().required('Page count is a required field').test('pageCount', 'Must be a number', (value) => {
        const regx = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
        return regx.test(value)
    }),
    genre: yup.string().required(),
    authors: yup.string().required(),
    image: yup.mixed().required().test('fileType', 'Must be jpeg/png file type', (value) => {
        return ['image/jpeg', 'image/png'].includes(value[0]?.type)
    }),
    file: yup.mixed().required().test('fileType', 'Must be pdf file type', (value) => {
        return ['application/pdf'].includes(value[0]?.type)
    }),
});