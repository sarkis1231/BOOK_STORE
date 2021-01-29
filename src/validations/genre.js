const {MESSAGES} = require("../utility/constants");
const {body, param} = require("express-validator");
const {Genres} = require("../models/Genre");
const {Fn} = require("../utility/functions");

const GenreValidation = {};

GenreValidation.add = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .custom(function (value, {req}) {
            return Genres.findOne({name:value}).then(function (genre){
                if(genre) {
                    return Promise.reject(MESSAGES.GENRE_NAME_ALREADY_EXIST);
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
            return Genres.findOne({name: value}).then(function (genre) {
                if (genre) {
                    return Promise.reject(MESSAGES.GENRE_NAME_ALREADY_EXIST);
                }
            });
        }),
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Genres.findOne({_id: value}).then(function (genre) {
                if (!genre) {
                    return Promise.reject(MESSAGES.GENRE_NOT_FOUND);
                }
            });
        })

];

module.exports = GenreValidation;