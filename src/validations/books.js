const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");

const BookValidation = {};

BookValidation.add = [ //TODO Genre Validation
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

BookValidation.edit = [ //TODO Genre Validation
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

module.exports = BookValidation;