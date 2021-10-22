const redis = require("redis");
const {REDIS_URI} = require("./config/keys");
let redis_client = redis.createClient(REDIS_URI);

redis_client.on('ready', function () {
    console.log(`Redis connection is ready ${REDIS_URI}`);
});

redis_client.on('error', function (error) {
    console.log(error);
});

module.exports = redis_client;