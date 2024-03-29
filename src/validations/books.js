const ValidationsFns = require("../utility/validations");
const {MESSAGES} = require("../utility/constants");
const {body, param, check} = require("express-validator");
const {Fn} = require("../utility/functions");
const {Books} = require("../models/Books");
const {Genres} = require("../models/Genre");
const {Authors} = require("../models/Author");

const BookValidation = {};

const authorValidation = body('author')
    .notEmpty()
    .withMessage(MESSAGES.REQUIRED_FIELDS)
    .custom(function (value, {req}) {
        if (!Fn.isMongooseValidId(value)) {
            throw new Error(MESSAGES.INVALID_ID);
        }
        return Authors.findById(value).then(function (author) {
            if (!author) {
                return Promise.reject(MESSAGES.AUTHOR_IS_NOT_FOUND);
            }
        });
    });

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
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_ID);
            }
            return Genres.findById(value).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        }),
    authorValidation,
    check('files')
        .custom(function (value, {req}) {
            if (!Fn.isEmpty(req.files)) {
                throw new Error(MESSAGES.REQUIRED_FIELDS);
            }
        }),
    body('pageCount')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .isInt({min: 0, max: 10000})
        .withMessage(MESSAGES.NOT_VALID_NUMBER),
    body('publishedDate')
        .optional()
        .trim()
        .isDate()
        .withMessage(MESSAGES.NOT_VALID_DATE),
];

BookValidation.edit = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Books.findOne({name: value}).then(function (book) {
                if (book) {
                    return Promise.reject(MESSAGES.BOOK_NAME_ALREADY_EXIST);
                }
            });
        }),
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Books.findById(value).then(function (book) {
                if (!book) {
                    return Promise.reject(MESSAGES.BOOK_NOT_FOUND);
                }
            });
        }),
    body('genre')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Genres.findById(value).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        }),
    authorValidation,
    check('files')
        .custom(function (value, {req}) {
            if (!Fn.isEmpty(req.files)) {
                throw new Error(MESSAGES.REQUIRED_FIELDS);
            }
        }),
    body('pageCount')
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .isInt({min: 0, max: 10000})
        .withMessage(MESSAGES.NO_SUCH_DATA_EXISTS),
    body('publishedDate')
        .optional()
        .custom(function (value) {
            if (!Fn.isValidDate(value)) {
                throw new Error(MESSAGES.NOT_VALID_DATE);
            }
        })
];

BookValidation.filter = [
    param('genre')
        .optional()
        .custom(function (value, {req}) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_ID);
            }
            return Genres.findById(value).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        }),
    param('author')
        .optional()
        .custom(function (value, {req}) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_ID);
            }
            return Authors.findById(value).then(function (author) {
                if (!author) {
                    return Promise.reject(MESSAGES.AUTHOR_IS_NOT_FOUND);
                }
            });
        }),
    param('pageCount')
        .optional()
        .isInt({min: 0, max: 10000})
        .withMessage(MESSAGES.NOT_VALID_NUMBER),
    param('publishedDate')
        .optional()
        .trim()
        .custom(ValidationsFns.isItDate),
    param('limitBy')
        .optional()
        .isInt({min: 0, max: 100})
        .withMessage(MESSAGES.NOT_VALID_NUMBER),
    param('index')
        .optional()
        .isInt({min: 0})
        .withMessage(MESSAGES.NOT_VALID_NUMBER),
];


module.exports = BookValidation;