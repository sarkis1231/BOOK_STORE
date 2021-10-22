const {Model} = require("mongoose");
let modelUtil = {};

modelUtil.getQueryWithDisable = function (qry) {
    qry = qry || {};
    return {...qry, disabled: {$ne: true}}
};

modelUtil.ignoreQry = function (qry) {
    return qry || {'updatedAt': 0};
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

module.exports = modelUtil;
