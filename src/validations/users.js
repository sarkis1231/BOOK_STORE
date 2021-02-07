const {body, param} = require("express-validator");
const {Users} = require("../models/Users");
const {ALL_USER_ROLES} = require("../roles");
const bcrypt = require("bcryptjs");
const {Fn} = require("../utility/functions");
const {MESSAGES} = require("../utility/constants");

const UserValidation = {};

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
    body("password")
        .trim()
        .isLength({min: 5})
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
    body("password")
        .trim()
        .isLength({min: 5}),
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
            if (value === req.user.email) { //leaving the same email
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
                if(!Fn.isMongooseValidId(value[i])){
                    throw new Error(MESSAGES.INVALID_IDS);
                }
            }

            if(value.length === req.body.limit.length) {
                throw new Error(MESSAGES.ID_NOT_MATCH);
            }
            // trust FE to always send Valid Genre Id ;)
        }),
    body('limit')
        .optional()
        .custom(function (value, {req}) {
            for (let i = 0; i < value.length; i++) {
                if(!Fn.Fn.isNumber(value[i])){
                    throw new Error(MESSAGES.INVALID_NUMBERS);
                }
            }
        }),
];

UserValidation.changePassword = [
    body("current_password")
        .notEmpty()
        .custom(function (value, {req}) {
        return bcrypt.compare(value, req.user.password).then(function (match) {
            if (!match) {
                return Promise.reject(MESSAGES.WRONG_PASSWORD);
            }
        })
    }),
    body("new_password")
        .trim()
        .isLength({min: 5}),
    body("confirm_new_password")
        .custom(function (value, {req}) {
        return value === req.body.new_password;
    })
];

UserValidation.Role = [
    param('role')
        .custom(function (value) {
            return ALL_USER_ROLES.some(i => i === value);
        })
];

module.exports = UserValidation;