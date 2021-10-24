const {clearRedisKey} = require("../utility/cache");

async function clearCache(req, res, next) {
    await next(); // this will wait handler request handler
    return clearRedisKey(req.cacheKey);
}