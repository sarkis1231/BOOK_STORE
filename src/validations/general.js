const {param} = require("express-validator");
const {Fn} = require("../utility/functions");

const paramIdValidation = [
    param('id')
        .custom(function (value) {
            return Fn.isMongooseValidId(value);
        })
];

module.exports = {paramIdValidation};