/**
 * @type {{
 *     authentication:Function,
 *     cleanUps:Function,
 *     getUnique:Function
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

module.exports = JEST_FN;