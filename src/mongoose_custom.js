// General Mongoose ORM configs

const {Schema, Query} = require("mongoose");
const modelUtil = require("./utility/model");
const {Fn} = require("./utility/functions");
const redis_client = require("./redis_client");


function CustomSchema(...params) {
    const schema = new Schema(...params);

    // TODO make the  parameters into a single Object

    /***
     * @param query {Object=}
     * @param configs {{
     *     ignore:Boolean,
     *     lean:Boolean,
     *     cache:Boolean
     * }}
     * @return Promise
     * */
    schema.statics.getAll = async function (query, configs) {
        query = modelUtil.getQueryWithDisable(query);
        const ignoreQuery = modelUtil.ignoreQry(configs.ignore);

        if (configs.cache) {
            return configs.lean ?
                this.find(query, ignoreQuery).cacheWithModel().lean() :
                this.find(query, ignoreQuery).cacheWithModel();
        }

        return configs.lean ?
            this.find(query, ignoreQuery).lean() :
            this.find(query, ignoreQuery);
    };

    /***
     * @param query {Object=}
     * @param ignore {Boolean=}
     * @param lean{Boolean=} to return js object instead of heavy mongoose Document
     * @param cache {Boolean=} caching is done with Model name
     * @return Promise
     * */
    schema.statics.getOne = async function (query, ignore, lean, cache) {
        query = modelUtil.getQueryWithDisable(query);
        const ignoreQuery = modelUtil.ignoreQry(ignore);

        if (cache) {
            return lean ?
                this.findOne(query, ignoreQuery).cacheWithModel().lean() :
                this.findOne(query, ignoreQuery).cacheWithModel();
        }

        return lean ?
            this.findOne(query, ignoreQuery).lean() :
            this.findOne(query, ignoreQuery);
    };

    /***
     * @param id {*}
     * @param ignore {Boolean=}
     * @param lean{Boolean=} to return js object instead of heavy mongoose Document
     * @param cache {Boolean=} caching is done with Model name
     * @return Promise
     * */
    schema.statics.getById = async function (id, ignore, lean, cache) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        let query = modelUtil.getQueryWithDisable({});
        const ignoreQuery = modelUtil.ignoreQry(ignore);
        query._id = id;

        if (cache) {
            return lean ?
                this.findOne(query, ignoreQuery).cacheWithModel().lean() :
                this.findOne(query, ignoreQuery).cacheWithModel();
        }

        return lean ?
            this.findOne(query, ignoreQuery).lean() :
            this.findOne(query, ignoreQuery);
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
 * @param options {{key:String}}
 * @return {Query}
 * */
Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = options.key ? JSON.stringify(options.key) : null;
    return this;
};

/**
 * @description cache with default Model name
 * @return {Query}
 * */
Query.prototype.cacheWithModel = function () {
    this.useCache = true;
    this.hashKey = this.mongooseCollection.collectionName;
    return this;
};

module.exports = {CustomSchema};


