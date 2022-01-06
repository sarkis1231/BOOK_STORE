const mongoose = require("mongoose");
const {redis_client} = require("../../src/redis_client");

/**
 * @type {{
 *     getUniqueStr: Function,
 *     cleanUp: Function
 * }}
 * */
let JEST_FN = {};

/**
 * @description get a unique string
 * @return String
 * */
JEST_FN.getUniqueStr = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


/**
 * @description cleanUp function for services
 * @return Promise
 * */
JEST_FN.cleanUp = async function () {
    return Promise.all([
        mongoose.connection.close(),
        redis_client.quit()
    ]);
};

module.exports = JEST_FN;