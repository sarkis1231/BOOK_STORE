const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");

const BookValidation = {};

BookValidation.add = [

];

BookValidation.edit = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

module.exports = BookValidation;