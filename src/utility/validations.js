const {Books} = require("../models/Books");
const {Genres} = require("../models/Genre");
const {MESSAGES} = require("./constants");
const {Fn} = require("./functions");
const {Authors} = require("../models/Author");

let ValidationsFns = {};

ValidationsFns.isItDate = function (value) {
    if (!Fn.isValidDate(value)) {
        throw new Error(MESSAGES.NOT_VALID_DATE);
    }
};

ValidationsFns.AuthorNameExists = function (value) {
    return Authors.findOne({name: value}).then(function (author) {
        if (author) {
            return Promise.reject(MESSAGES.NAME_ALREADY_EXIST);
        }
    });
};

ValidationsFns.AuthorExists = function (value) {
    if (!Fn.isMongooseValidId(value)) {
        throw new Error(MESSAGES.INVALID_ID);
    }
    return Authors.findById(value).then(function (author) {
        if (!author) {
            return Promise.reject(MESSAGES.AUTHOR_IS_NOT_FOUND);
        }
    });
};

ValidationsFns.GenreExist = function (value) {
    if (!Fn.isMongooseValidId(value)) {
        throw new Error(MESSAGES.INVALID_ID);
    }
    return Genres.findById(value).then(function (genre) {
        if (!genre) {
            return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
        }
    });
};

ValidationsFns.GenreNameExists = function (value) {
    return Genres.findOne({name: value}).then(function (genre) {
        if (genre) {
            return Promise.reject(MESSAGES.GENRE_NAME_ALREADY_EXIST);
        }
    });
};

ValidationsFns.BookNameExists = function (value) {
    return Books.findOne({name: value}).then(function (book) {
        if (book) {
            return Promise.reject(MESSAGES.BOOK_NAME_ALREADY_EXIST);
        }
    });
};

ValidationsFns.BookExists = function (value) {
    if (!Fn.isMongooseValidId(value)) {
        throw new Error(MESSAGES.INVALID_QUERY_PARAM);
    }
    return Books.findById(value).then(function (book) {
        if (!book) {
            return Promise.reject(MESSAGES.BOOK_NOT_FOUND);
        }
    });
};

module.exports = ValidationsFns;