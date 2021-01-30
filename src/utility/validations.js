const {MESSAGES} = require("./constants");
const {Fn} = require("./functions");
let ValidationsFns = {};

// TODO move it here the Common rest

ValidationsFns.isItDate = function (value) {
    if(!Fn.isValidDate(value)){
        throw new Error(MESSAGES.NOT_VALID_DATE);
    }
};

// TODO is Author found

// TODO Author is not found

// TODO Book is found

// TODO Book is not found

// TODO User Found

// User not Found

module.exports = ValidationsFns;