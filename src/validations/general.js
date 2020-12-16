const {param} = require("express-validator");
const mongoose = require("mongoose");

const paramIdValidation = [
    param('id')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        })
];

module.exports = {paramIdValidation};