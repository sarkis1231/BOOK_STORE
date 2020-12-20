const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");

const GenreValidation = {};

GenreValidation.add = [
    body('name') //tODO check whether or not
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

GenreValidation.edit = [
    body('name') //tODO check whether or not
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
];

module.exports = BookValidation;