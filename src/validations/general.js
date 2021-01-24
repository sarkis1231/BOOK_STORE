const {param} = require("express-validator");
const mongoose = require("mongoose");
const {Fn} = require("../utility/functions");

const paramIdValidation = [
    param('id')
        .custom(function (value) {
            return Fn.isMongooseValidId(value);
        })
];

module.exports = {paramIdValidation};