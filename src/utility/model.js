const {Model} = require("mongoose");
let modelUtil = {};

/**
 * @param qry {Object=}
 * @return Object
 * */
modelUtil.getQueryWithDisable = function (qry={}) {
    return {...qry, disabled: {$ne: true}}
};

/**
 * @param qry {Object=}
 * @return Object
 * */
modelUtil.ignoreQry = function (qry) {
    return qry || {'updatedAt': 0};
};

/**
 * @param obj {Object}
 * @return Boolean
 * */
modelUtil.isModel = function (obj = {}) {
    return obj.prototype instanceof Model
};

/**
 * @param userModal {Object}
 * */
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
