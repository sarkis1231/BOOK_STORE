// General Mongoose ORM configs

const {Schema, Query} = require("mongoose");
const modelUtil = require("./utility/model");
const {Fn} = require("./utility/functions");
const redis_client = require("./redis_client");


function CustomSchema(...params) {
    const schema = new Schema(...params);

    /***
     * @param query {Object=}
     * @param ignore {Boolean=}
     * @param lean{Boolean=}
     * @return Promise
     * */
    schema.statics.getAll = async function (query, ignore, lean) {
        query = modelUtil.getQueryWithDisable(query);
        if (lean) {
            return this.find(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.find(query, modelUtil.ignoreQry(ignore));
    };

    /***
     * @param query {Object=}
     * @param ignore {Boolean=}
     * @param lean{Boolean=}
     * @return Promise
     * */
    schema.statics.getOne = async function (query, ignore, lean) {
        query = modelUtil.getQueryWithDisable(query);
        if (lean) {
            return this.findOne(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.findOne(query, modelUtil.ignoreQry(ignore));
    };

    /***
     * @param id {*}
     * @param ignore {Boolean=}
     * @param lean{Boolean=}
     * @return Promise
     * */
    schema.statics.getById = async function (id, ignore, lean) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        let query = modelUtil.getQueryWithDisable({});
        query._id = id;
        if (lean) {
            return this.findOne(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.findOne(query, modelUtil.ignoreQry(ignore));
    };

    /***
     * @param query {Object=}
     * @return Promise
     * */
    schema.statics.disable = async function (query) {
        query = modelUtil.getQueryWithDisable(query);
        return this.update(query, {
            $set: {
                disabled: true
            }
        });
    };

    /***
     * @param id {*}
     * @return Promise
     * */
    schema.statics.disableById = async function (id) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        return this.findByIdAndUpdate(id, {disabled: true});
    };

    return schema;
}

const exec = Query.prototype.exec;

/**
 * @return {Promise}
 * */
Query.prototype.exec = async function () {

    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    let key = JSON.stringify({...this.getQuery(), collection: this.mongooseCollection.collectionName});

    let cacheValue;
    if (this.hashKey) {
        cacheValue = await redis_client.hget(this.hashKey, key);
    } else {
        cacheValue = await redis_client.get(key);
    }

    if (cacheValue) {
        const data = JSON.parse(cacheValue);
        if (Array.isArray(data)) {
            return data.map((item) => {
                return new this.model(item);
            });
        }
        return new this.model(data);
    }

    // Document instance
    const result = await exec.apply(this, arguments);
    if (this.hashKey) {
        redis_client.hset(this.hashKey, key, JSON.stringify(result));
    } else {
        redis_client.set(key, JSON.stringify(result));
    }

    return result
};

/**
 * @description adding cache parameter in Query instance
 * @param options {Object}
 * @return {Query}
 * */
Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = options.key ? JSON.stringify(options.key) : null;
    return this;
};

/**
 * @description delete hash key
 * @param {String} hashKey
 * @return Promise
 * */
function clearHash(hashKey) {
    return redis_client.del(hashKey);
}

module.exports = {CustomSchema, clearHash};


