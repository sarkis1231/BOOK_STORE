const {param} = require("express");

const mongoose = require("mongoose");

export const paramIdValidation = [
    param('id')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        })
];

module.exports = {paramIdValidation};