const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const mongoose = require("mongoose");
const {Books} = require("../models/Books");
const {Genres} = require("../models/Genre");

const BookValidation = {};

BookValidation.add = [
    body('name')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Books.findOne({name: value}).then(function (book) {
                if (book) {
                    return Promise.reject(MESSAGES.BOOK_ALREADY_EXIST);
                }
            });
        }),
    body('genre')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            let validId = mongoose.Types.ObjectId.isValid(value);
            if (!validId) {
                throw new Error(MESSAGES.INVALID_ID);
            }
            return Genres.findById(value).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        })
];

BookValidation.edit = [
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
        }),
    body('genre')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            Genres.findById(value).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        })
];

module.exports = BookValidation;