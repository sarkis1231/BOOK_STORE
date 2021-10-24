const {Fn} = require("./functions");
const {redis_client} = require("../redis_client");

/**
 * @description delete hash key
 * @param {String} hashKey
 * @return Promise
 * */
function clearRedisKey(hashKey) {
    if(Fn.isString(hashKey)){
        return redis_client.del(hashKey);
    }
    return Promise.reject('Not a string');
}


module.exports = {clearRedisKey}