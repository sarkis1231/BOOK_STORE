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

const errorValidationFiles = function (req,array) {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        let isFileError = -1;
        let obj = {};
        let errorArray = errors.errors;

        for (let i = 0; i < errorArray.length; i++) {
            let item  = errorArray[i];
            if(item.param === 'files') {
                isFileError = i;
                obj = errorArray[i];
                errorArray.splice(i,1);
            }
        }

        if (isFileError !== -1) {
            for (let i = 0; i < array.length; i++) {
                let value = req.files[array[i]];
                 if(!value) {
                    obj.param =  array[i];
                    errorArray.push(obj)
                }
            }
        }
        errorThrower("Validation Failed", 422, errors.mapped());
    }

}

module.exports = {errorThrower, errorCatcher, errorFormatter, errorValidation,errorValidationFiles};