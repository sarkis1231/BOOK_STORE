const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const mongoose = require("mongoose");
const {Books} = require("../models/Books");
const {Authors} = require("../models/Author");

const AuthorsValidation = {};

AuthorsValidation.add = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Books.findOne({name: value}).then(function (genre) {
                if (genre) {
                    return Promise.reject(MESSAGES.BOOK_ALREADY_EXIST);
                }
            });
        })
];

AuthorsValidation.edit = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Authors.findOne({name: value}).then(function (book) {
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
            return Authors.findOne({name: value}).then(function (author) {
                if (!author) {
                    return Promise.reject(MESSAGES.BOOK_NOT_FOUND);
                }
            });
        }),

];

module.exports = AuthorsValidation;