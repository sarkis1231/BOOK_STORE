const {validationResult} =  require("express-validator");

const errorThrower = function (errMessage, statusCode, data) {
    const error = new Error(errMessage);
    error["statusCode"] = statusCode;
    error["data"] = data;
    throw error;
};

const errorCatcher = function (next, err) {
    if (!err["statusCode"]) {
        err["statusCode"] = 500;
    }
    next(err);
};

const errorFormatter = function ({location, msg, param, value, nestedErrors}) { //change this later
    return `${msg}`;
};

const errorValidation = function (req) {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        errorThrower("Validation Failed", 422, errors.mapped());
    }
};

module.exports = {errorThrower, errorCatcher, errorFormatter, errorValidation};