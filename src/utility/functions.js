const mongoose = require('mongoose');
const path = require('path');

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

Fn.noop = function () {
};

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

Fn.toObjectId = function (id) {
    return new mongoose.Types.ObjectId(id);
}

Fn.sameObjectId = function (objId1, objId2) {
    if (!Fn.isMongooseValidId(objId1) || !Fn.isMongooseValidId(objId2)) {
        return false;
    }
    return objId1.toString() === objId2.toString();
};

Fn.sanitizeQuery = function (query) {
    query = query || {};
    for (const queryKey in query) {
        if (Fn.isUndefined(query[queryKey])) {
            delete query[queryKey];
        }
    }
    return query;
};

Fn.isValidDate = function (value) {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return false;
    }
    const date = new Date(value);
    if (!date.getTime()) {
        return false
    }
    return date.toISOString().slice(0, 10) === value;
};

Fn.isNumber = function (value) {
    return typeof value === 'number';
};

Fn.arrayToObj = function (array, key) {
    return array.reduce(function (accumulator, currentValue) {
        let obj = {...accumulator};
        let id = currentValue[key];
        obj[id] = currentValue;
        return obj;
    }, {});
};

Fn.isArray = function (array) {
    return Array.isArray(array);
};

Fn.getRootDirectory = function () {
    return path.dirname(process.mainModule.filename);
};

Fn.getUploadsDirectory = function () {
    return path.join(this.getRootDirectory(), 'uploads');
};


module.exports = {Fn};