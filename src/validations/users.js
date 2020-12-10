const {body, param} = require("express-validator");

const {Users} = require("../models/Users");
const {ALL_USER_ROLES} = require("../roles");
const bcrypt =  require("bcryptjs");


export const registerValidation = [
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail(),
    body("password")
        .trim()
        .isLength({min: 5}),
    body("confirm_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty(),
];

export const registerUserValidation = [
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail(),
    body("password")
        .trim()
        .isLength({min: 5}),
    body("role")
        .custom(function(value)  {
            return ALL_USER_ROLES.includes(value);
        }),
    body("confirm_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty()
];

export const editUserValidation = [
    body('name')
        .trim()
        .notEmpty(),
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            if(value === req.user.email) { //leaving the same email
                return  true;
            }
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail()
];

export const changePasswordValidation = [
    body("current_password").notEmpty().custom( function (value, {req}){
        return bcrypt.compare(value, req.user.password).then(function (match){
            if(!match) {
                return Promise.reject("Wrong Password");
            }
        })
    }),
    body("new_password")
        .trim()
        .isLength({min: 5}),
    body("confirm_new_password").custom(function (value, {req}) {
        return value === req.body.new_password;
    })
];

export const usersRoleValidation = [
    param('role')
        .custom(function (value) {
            return ALL_USER_ROLES.some(i => i === value);
        })
];