const {MESSAGES} = require("./constants");
const {Fn} = require("./functions");
let ValidationsFns = {};

// TODO move it here the Common rest

ValidationsFns.isItDate = function (value) {
    if(!Fn.isValidDate(value)){
        throw new Error(MESSAGES.NOT_VALID_DATE);
    }
};

module.exports = ValidationsFns;