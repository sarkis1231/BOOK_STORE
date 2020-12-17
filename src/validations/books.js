const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");

const addBookValidation = [

];


const editBookValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

module.exports = {addBookValidation,editBookValidation};