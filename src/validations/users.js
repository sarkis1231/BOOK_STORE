const {body, param} = require("express-validator");
const {Users} = require("../models/Users");
const {ALL_USER_ROLES} = require("../roles");
const bcrypt = require("bcryptjs");
const {LIMITS} = require("../utility/constants");
const {Fn} = require("../utility/functions");
const {MESSAGES} = require("../utility/constants");

const UserValidation = {};

const passwordValidation = body("password")
    .trim()
    .isLength({min: 5})
    .withMessage(MESSAGES.PASSWORD_MUST_BE_X_CHARACTER);

UserValidation.login = [
    body("email")
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .isEmail()
        .bail()
        .withMessage(MESSAGES.VALID_EMAIL)
        .custom(function (value, {req}) {
            return Users.findOne({email: value}).then(function (userDoc) {
                if (!userDoc) {
                    return Promise.reject(MESSAGES.NO_USER_FOUND);
                }
            });
        })
    ,
    passwordValidation
];

UserValidation.register = [
    body("email")
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
        .isEmail()
        .bail()
        .withMessage(MESSAGES.VALID_EMAIL)
        .custom(function (value, {req}) {
            return Users.findOne({email: value}).then(function (userDoc) {
                if (userDoc) {
                    return Promise.reject(MESSAGES.EMAIL_IS_REGISTERED);
                }
            });
        }).normalizeEmail(),
    passwordValidation,
    body("confirm_password")
        .custom(function (value, {req}) {
            return value === req.body.password
        })
        .withMessage(MESSAGES.PASSWORD_MUST_MATCH)
    ,
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS)
    ,
];

UserValidation.edit = [
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Users.findById(value).then(function (user) {
                if (!user) {
                    return Promise.reject(MESSAGES.NO_USER_FOUND);
                }
            });
        }),
    body('name')
        .trim()
        .notEmpty()
        .withMessage(MESSAGES.REQUIRED_FIELDS),
    body("email")
        .isEmail()
        .bail()
        .withMessage(MESSAGES.VALID_EMAIL)
        .custom(function (value, {req}) {
            if (value === req.user.email) { //leaving the same email //TODO not working correctly
                return true;
            }
            return Users.findOne({email: value}).then(function (userDoc) {
                if (userDoc) {
                    return Promise.reject(MESSAGES.EMAIL_IS_REGISTERED);
                }
            });
        }).normalizeEmail()
];

UserValidation.editUserPermission = [
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Users.findById(value).then(function (user) {
                if (!user) {
                    return Promise.reject(MESSAGES.NO_USER_FOUND);
                }
            });
        }),
    body('genre')
        .optional()
        .custom(function (value, {req}) {
            for (let i = 0; i < value.length; i++) {
                if (!Fn.isMongooseValidId(value[i])) {
                    throw new Error(MESSAGES.INVALID_IDS);
                }
            }

            if (Fn.isEmpty(req.body.limit)) {
                throw new Error(MESSAGES.ID_NOT_MATCH);
            }

            if (value.length !== req.body.limit.length) {
                throw new Error(MESSAGES.ID_NOT_MATCH);
            }
            return true;
            // trust FE to always send Valid Genre Id ;)
        }),
    body('limit')
        .optional()
        .custom(function (value, {req}) {
            for (let i = 0; i < value.length; i++) {
                if (!LIMITS[value[i]]) {
                    throw new Error(MESSAGES.INVALID_LIMIT_PARAMETER);
                }
            }

            if (Fn.isEmpty(req.body.genre)) {
                throw new Error(MESSAGES.ID_NOT_MATCH);
            }

            if (value.length !== req.body.genre.length) {
                throw new Error(MESSAGES.ID_NOT_MATCH);
            }
            return true;
        }),
    body('premium')
        .optional()
        .isBoolean()
];

UserValidation.changePassword = [
    param('id')
        .custom(function (value) {
            if (!Fn.isMongooseValidId(value)) {
                throw new Error(MESSAGES.INVALID_QUERY_PARAM);
            }
            return Users.findById(value).then(function (user) {
                if (!user) {
                    return Promise.reject(MESSAGES.NO_USER_FOUND);
                }
            });
        }),
    passwordValidation
];

UserValidation.Role = [
    param('role')
        .custom(function (value) {
            return ALL_USER_ROLES.some(i => i === value);
        })
];

module.exports = UserValidation;