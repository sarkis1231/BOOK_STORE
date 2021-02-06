import * as yup from "yup";

export const AddBookSchema = yup.object().shape({
    name: yup.string().required().min(3),
    pageCount: yup.string().required('Page count is a required field').test('pageCount', 'Must be a number', (value) => {
        const regx = /^[-+]?[0-9]+$/;
        return regx.test(value)
    }),
    publishedDate: yup.string().test('date', 'Must be a valid date (YYYY-MM-DD)', (value) => {
        const regx = /^\d{4}-\d{2}-\d{2}$/
        return regx.test(value) || value.length === 0
    }),
    genre: yup.string().required(),
    author: yup.string().required(),
    image: yup.mixed().required().test('fileType', 'Must be jpeg/png file type', (value) => {
        return ['image/jpeg', 'image/png'].includes(value[0]?.type)
    }),
    file: yup.mixed().required().test('fileType', 'Must be pdf file type', (value) => {
        return ['application/pdf'].includes(value[0]?.type)
    }),
});

export const EditBookSchema = yup.object().shape({
    name: yup.string().required().min(3),
    pageCount: yup.string().required('Page count is a required field').test('pageCount', 'Must be a number', (value) => {
        const regx = /^[-+]?[0-9]+$/;
        return regx.test(value)
    }),
    publishedDate: yup.string().test('date', 'Must be a valid date (YYYY-MM-DD)', (value) => {
        const regx = /^\d{4}-\d{2}-\d{2}$/
        return regx.test(value) || value.length === 0
    }),
    genre: yup.string().required(),
    author: yup.string().required(),
    image: yup.mixed().test('fileType', 'Must be jpeg/png file type', (value) => {
        return ['image/jpeg', 'image/png'].includes(value[0]?.type)
    }),
    file: yup.mixed().test('fileType', 'Must be pdf file type', (value) => {
        return ['application/pdf'].includes(value[0]?.type)
    }),
});