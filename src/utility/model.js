const {Fn} = require("./functions");
const {Model} = require("mongoose");
let modelUtil = {};

modelUtil.getQueryWithDisable = function (qry) {
    qry = qry || {};
    return {...qry, disabled: {$ne: true}}
};

modelUtil.ignoreQry = function (qry) {
    return qry || {'createdAt': 0, 'updatedAt': 0};
};

modelUtil.getAll = async function (query, ignore, lean) {
    query = modelUtil.getQueryWithDisable(query);
    if (lean) {
        return this.find(query, this.ignoreQry(ignore)).lean();
    }
    return this.find(query, this.ignoreQry(ignore));
};

modelUtil.getOne = async function (query, ignore, lean) {
    query = modelUtil.getQueryWithDisable(query);
    if (lean) {
        return this.findOne(query, this.ignoreQry(ignore)).lean();
    }
    return this.findOne(query, this.ignoreQry(ignore));
};

modelUtil.getById = async function (id, ignore, lean) {
    if (Fn.isUndefined(id)) {
        console.error('id should be defined');
        return;
    }
    let query = modelUtil.getQueryWithDisable({});
    query._id = id;
    if (lean) {
        return this.findOne(query, this.ignoreQry(ignore)).lean();
    }
    return this.findOne(query, this.ignoreQry(ignore));
};

modelUtil.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query, {
        $set: {
            disabled: true
        }
    });
};

modelUtil.disableById = async function (id) {
    if (Fn.isUndefined(id)) {
        console.error('id should be defined');
        return;
    }
    return this.findByIdAndUpdate(id, {disabled: true});
};

modelUtil.isModel = function (obj) {
    obj = obj || {}
    return obj.prototype instanceof Model
};

module.exports = modelUtil;
