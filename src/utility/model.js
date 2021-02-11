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
        console.error('id should be defined');
        return;
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
        console.error('id should be defined');
        return;
    }
    return this.findByIdAndUpdate(id, {disabled: true});
};

modelUtil.isModel = function (obj) {
    obj = obj || {}
    return obj.prototype instanceof Model
};

modelUtil.getQueryWithPermission = async function (userModal) {
    let myUserModal = await userModal.populate('permission');
    let permission = myUserModal['permission'];
    let query = {};
    if (permission.premium) {
        return query; //all permissions
    }

    return permission.groups;
};

module.exports = modelUtil;
