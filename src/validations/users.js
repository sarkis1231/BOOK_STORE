const {body, param} = require("express-validator");
const {Users} = require("../models/Users");
const {ALL_USER_ROLES} = require("../roles");
const bcrypt = require("bcryptjs");
const {MESSAGES} = require("../utility/constants");


const loginValidation = [
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

const registerValidation = [
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

const editUserValidation = [
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
            return Users.findOne({email: value}).then(function (userDoc) { //TODO find a way to send to controller
                if (userDoc) {
                    return Promise.reject(MESSAGES.EMAIL_IS_REGISTERED);
                }
            });
        }).normalizeEmail()
];

const changePasswordValidation = [
    body("current_password").notEmpty().custom(function (value, {req}) {
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

const usersRoleValidation = [
    param('role')
        .custom(function (value) {
            return ALL_USER_ROLES.some(i => i === value);
        })
];

module.exports = {
    loginValidation,
    registerValidation,
    editUserValidation,
    changePasswordValidation,
    usersRoleValidation
};