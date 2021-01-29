const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const {Fn} = require("../utility/functions");
const {Authors} = require("../models/Author");

const AuthorsValidation = {};

AuthorsValidation.add = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Authors.findOne({name: value}).then(function (author) {
                if (author) {
                    return Promise.reject(MESSAGES.NAME_ALREADY_EXIST);
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
            return Authors.findOne({name: value}).then(function (author) {
                if (author) {
                    return Promise.reject(MESSAGES.NAME_ALREADY_EXIST);
                }
            });
        }),
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Authors.findOne({_id: value}).then(function (author) {
                if (!author) {
                    return Promise.reject(MESSAGES.BOOK_NOT_FOUND);
                }
            });
        }),

];

module.exports = AuthorsValidation;