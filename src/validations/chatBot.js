const {MESSAGES} = require("../utility/constants");
const {body} = require("express-validator");

const chatBotValidation = {};

chatBotValidation.add = [
    body('message')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
];

module.exports = chatBotValidation;