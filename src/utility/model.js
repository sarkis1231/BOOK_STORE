const {Fn} = require("./functions");
const {Model} = require("mongoose");
let modelUtil = {};

modelUtil.getQueryWithDisable = function (qry) {
    qry = qry || {};
    return {...qry, disabled: {$ne: true}}
};

modelUtil.ignoreQry = function (qry) {
    return qry || {'updatedAt': 0};
};

modelUtil.getAll = async function (query, ignore, lean) {
    query = modelUtil.getQueryWithDisable(query);
    if (lean) {
        return this.find(query, modelUtil.ignoreQry(ignore)).lean();
    }
    return this.find(query, modelUtil.ignoreQry(ignore));
};

modelUtil.getOne = async function (query, ignore, lean) {
    query = modelUtil.getQueryWithDisable(query);
    if (lean) {
        return this.findOne(query, modelUtil.ignoreQry(ignore)).lean();
    }
    return this.findOne(query, modelUtil.ignoreQry(ignore));
};

modelUtil.getById = async function (id, ignore, lean) {
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
        return Promise.reject('id should be defined');
    }
    return this.findByIdAndUpdate(id, {disabled: true});
};

modelUtil.isModel = function (obj) {
    obj = obj || {}
    return obj.prototype instanceof Model
};

modelUtil.getQueryWithPermission = async function (userModal) {
    if (userModal.isAdmin()) {
        return {};
    }

    // Call the `populate()` method on a document to populate a path.
    // Need to call `execPopulate()` to actually execute the `populate()`.
    let myUserModal = await userModal.populate('permission').execPopulate();

    // TODO figure out a way to add lean()

    let permission = myUserModal['permission'];
    if (permission.premium) {
        return {}; //all permissions
    }

    return permission.genre;
};

const staticsFn = ['getAll', 'getOne', 'getById', 'disable', 'disableById'];

modelUtil.addSchemaStaticFunctions = function (schema) {
    for (let i = 0; i < staticsFn.length; i++) {
        schema.statics[staticsFn[i]] = modelUtil[staticsFn[i]];
    }
    return schema;
};

module.exports = modelUtil;
