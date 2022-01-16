const mongoose = require('mongoose');
const path = require('path');

let Fn = {};
/**
 * @param value{*}
 * @return Boolean
 * */
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

/**
 * @param str {*}
 * @return Boolean
 * */
Fn.isString = function (str) {
    return typeof str === 'string' || str instanceof String;
};

/**
 * @param obj {*}
 * @return Boolean
 * */
Fn.isObject = function (obj) {
    let type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

/**
 * @param item {*}
 * @return Boolean
 * */
Fn.isUndefined = function (item) {
    return typeof item === 'undefined';
};

/**
 * @param item {*}
 * @return Boolean
 * */
Fn.isDefined = function (item) {
    return typeof item !== 'undefined';
};

/**
 * @param id {*}
 * @return Boolean
 * */
Fn.isMongooseValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id)
};

Fn.toObjectId = function (id) {
    return new mongoose.Types.ObjectId(id);
}

/**
 * @return Boolean
 * */
Fn.sameObjectId = function (objId1, objId2) {
    if (!Fn.isMongooseValidId(objId1) || !Fn.isMongooseValidId(objId2)) {
        return false;
    }
    return objId1.toString() === objId2.toString();
};

/**
 * @param query {Object}
 * @return {Object}
 * */
Fn.sanitizeQuery = function (query = {}) {
    for (const queryKey in query) {
        if (Fn.isUndefined(query[queryKey])) {
            delete query[queryKey];
        }
    }
    return query;
};

/**
 * @param value {*}
 * @return Boolean
 * */
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

/**
 * @param value {*}
 * @return Boolean
 * */
Fn.isNumber = function (value) {
    return typeof value === 'number';
};

/**
 * @param array {Array}
 * @param key {String}
 * @return Object
 * */
Fn.arrayToObj = function (array, key) {
    return array.reduce(function (accumulator, currentValue) {
        let obj = {...accumulator};
        let id = currentValue[key];
        obj[id] = currentValue;
        return obj;
    }, {});
};

/**
 * @param array {*}
 * @return Boolean
 * */
Fn.isArray = function (array) {
    return Array.isArray(array);
};

/**
 * @return String
 * */
Fn.getRootDirectory = function () {
    return path.dirname(process.mainModule.filename);
};

/**
 * @return String
 * */
Fn.getUploadsDirectory = function () {
    return path.join(this.getRootDirectory(), 'uploads');
};

/**
 * @description view Log only in dev enviroment
 * @param msg {String}
 * */
Fn.LOG = function (msg) {
    if(process.env.NODE_ENV !== 'CI') { // TODO check me with no variable why?
        console.log(msg);
    }
};


module.exports = {Fn};