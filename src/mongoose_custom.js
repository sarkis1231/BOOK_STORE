// General Mongoose ORM configs

const {Schema, Query} = require("mongoose");
const modelUtil = require("./utility/model");
const {Fn} = require("./utility/functions");
const {redis_client} = require("./redis_client");


function CustomSchema(...params) {
    const schema = new Schema(...params);

    /***
     * @param query {Object=}
     * @param configs {{
     *     ignore:Boolean,
     *     lean:Boolean,
     *     cache:Boolean
     * }}
     * @return Promise
     * */
    schema.statics.getAll = async function (query, configs = {}) {
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
     * @param configs {{
     *     ignore:Boolean,
     *     lean:Boolean,
     *     cache:Boolean
     * }}
     * @return Promise
     * */
    schema.statics.getOne = async function (query, configs = {}) {
        query = modelUtil.getQueryWithDisable(query);
        const ignoreQuery = modelUtil.ignoreQry(configs.ignore);

        if (configs.cache) {
            return configs.lean ?
                this.findOne(query, ignoreQuery).cacheWithModel().lean() :
                this.findOne(query, ignoreQuery).cacheWithModel();
        }

        return configs.lean ?
            this.findOne(query, ignoreQuery).lean() :
            this.findOne(query, ignoreQuery);
    };

    /***
     * @param id {*}
     * @param configs {{
     *     ignore:Boolean,
     *     lean:Boolean,
     *     cache:Boolean
     * }}
     * @return Promise
     * */
    schema.statics.getById = async function (id, configs = {}) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        let query = modelUtil.getQueryWithDisable({});
        const ignoreQuery = modelUtil.ignoreQry(configs.ignore);
        query._id = id;

        if (configs.cache) {
            return configs.lean ?
                this.findOne(query, ignoreQuery).cacheWithModel().lean() :
                this.findOne(query, ignoreQuery).cacheWithModel();
        }

        return configs.lean ?
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
 * @description overriding Mongoose Query Exec function to keep the old functionality
 * and add new Functionality the required cache
 * @return {Promise}
 * */
Query.prototype.exec = async function () {

    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    let keyQuery = JSON.stringify({
        ...this.getQuery(),
        collection: this.mongooseCollection.collectionName
    });

    let cacheValue;
    if (this.hashKey) {
        cacheValue = await redis_client.hget(this.hashKey, keyQuery);
    } else {
        cacheValue = await redis_client.get(keyQuery);
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
        redis_client.hset(this.hashKey, keyQuery, JSON.stringify(result)).then(function (){});
    } else {
        redis_client.set(keyQuery, JSON.stringify(result)).then(function (){});
    }

    return result;
};

/**
 * @description adding cache parameter in Query instance
 * @param options {{key:String}}
 * @example key -> QueryUnique -> Data
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
 * @example CollectionName -> QueryUnique -> Data
 * */
Query.prototype.cacheWithModel = function () {
    this.useCache = true;
    this.hashKey = this.mongooseCollection.collectionName;
    return this;
};

module.exports = {CustomSchema};


