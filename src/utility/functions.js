const mongoose = require('mongoose');

let Fn = {};

Fn.isEmpty = function (value) {
    return (
        !!(value === undefined || value === null ||
            (typeof value === 'object' && !(Array.isArray(value)) && value["empty"]) ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    );
}; //prototype Lib Util let's say

Fn.noop = function (){};

Fn.isString = function (str) {
    return typeof str === 'string' || str instanceof String;
};

Fn.isObject = function (obj) {
    let type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

Fn.isUndefined = function (item) {
    return typeof item === 'undefined';
};

Fn.isDefined = function (item) {
    return typeof item !== 'undefined';
};

Fn.isMongooseValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id)
};

Fn.sameObjectId = function (objId1, objId2) {
    if(!Fn.isMongooseValidId(objId1) ||!Fn.isMongooseValidId(objId2)) {
        return false;
    }
    return objId1.toString() === objId2.toString();
};

module.exports = {Fn};