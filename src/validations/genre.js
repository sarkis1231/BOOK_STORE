const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const {Genres} = require("../models/Genre");
const mongoose = require("mongoose");

const GenreValidation = {};

GenreValidation.add = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            Genres.findOne({name:value}).then(function (genre){
                if(genre) {
                    return Promise.reject(MESSAGES.GENRE_ALREADY_EXIST);
                }
            });
        })
];

GenreValidation.edit = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            Genres.findOne({name: value}).then(function (genre) {
                if (genre) {
                    return Promise.reject(MESSAGES.GENRE_NAME_ALREADY_EXIST);
                }
            });
        }),
    param('id')
        .custom(function (value) {
            let validId = mongoose.Types.ObjectId.isValid(value);
            if (!validId) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            Genres.findOne({name: value}).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        })

];

module.exports = BookValidation;