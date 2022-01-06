
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
 * */
JEST_FN.cleanUp = async function () {
    await Promise.all([
        mongoose.disconnect(),
        redis_client.quit()
    ]);
    await mongoose.connection.close();
};

module.exports = JEST_FN;