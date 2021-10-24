const redis = require("redis");
const {REDIS_URI} = require("./config/keys");
const util = require('util');
const {Fn} = require("./utility/functions");

let redis_client = redis.createClient(REDIS_URI);

redis_client.get = util.promisify(redis_client.get);
redis_client.hget = util.promisify(redis_client.hget);
redis_client.del = util.promisify(redis_client.del);

redis_client.on('ready', function () {
    console.log(`Redis connection is ready ${REDIS_URI}`);
});

redis_client.on('error', function (error) {
    console.log(error);
});



module.exports = {redis_client};