const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const mongoose = require("mongoose");
const {Books} = require("../models/Books");

const BookValidation = {};

BookValidation.add = [ //TODO Genre Validation
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            Books.findOne({name: value}).then(function (genre) {
                if (genre) {
                    return Promise.reject(MESSAGES.BOOK_ALREADY_EXIST);
                }
            });
        })
];

BookValidation.edit = [ //TODO Genre Validation
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            Books.findOne({name: value}).then(function (book) {
                if (book) {
                    return Promise.reject(MESSAGES.BOOK_NAME_ALREADY_EXIST);
                }
            });
        }),
    param('id')
        .custom(function (value) {
            let validId = mongoose.Types.ObjectId.isValid(value);
            if (!validId) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            Books.findOne({name: value}).then(function (book) {
                if (!book) {
                    return Promise.reject(MESSAGES.BOOK_NOT_FOUND);
                }
            });
        })
];

module.exports = BookValidation;