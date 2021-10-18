const modelUtil = require("../model");
const {MESSAGES, messageAlert} = require("../constants");
const {errorValidation, errorThrower, errorCatcher} = require("./errors");
const {Fn} = require("../functions");
const {alert, noResult} = require("./messages");

let getCtrlFn = {};

/**
 * @description get command for model Route wrap up
 * @param myModel {Model}
 * */
getCtrlFn.Delete = function (myModel) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        try {
            errorValidation(req);
            const p = await myModel.disableById(req.params.id);
            if (!Fn.isEmpty(p)) {
                errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
            }
            return alert(res, 200, messageAlert.success, MESSAGES.ITEM_DELETED);

        } catch (err) {
            errorCatcher(next, err);
        }
    }
};

/**
 * @description get command for model Route wrap up
 * @param myModel {Model}
 * */
getCtrlFn.getAll = function (myModel) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        let items = await myModel.getAll({}, false, true);
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    }
};

/**
 * @description get command for model Route wrap up
 * @param myModel {Model}
 * */
getCtrlFn.getId = function (myModel) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        try {
            errorValidation(req);
            const item = await myModel.getById(req.params.id, false, true);
            if (!Fn.isEmpty(item)) {
                return res.status(200).json(item);
            }
            noResult(res);
        } catch (err) {
            errorCatcher(next, err);
        }
    }
};

/**
 * @description get controller function with in memory cached Query
 * @param myModel {Model}
 * */
getCtrlFn.getIdWithCache = function (myModel) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        try {
            errorValidation(req);
            const item = await myModel.getById(req.params.id, false, true);
            const modelName = myModel.modelName;

            
            if (!Fn.isEmpty(item)) {
                return res.status(200).json(item);
            }
            noResult(res);
        } catch (err) {
            errorCatcher(next, err);
        }
    }
};

/**
 * @description get controller function with in memory cached Query
 * @param myModel {Model}
 * */
getCtrlFn.getAllWithCache = function (myModel) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        try {
            errorValidation(req);
            const item = await myModel.getById(req.params.id, false, true);
            const modelName = myModel.modelName;

            if (!Fn.isEmpty(item)) {
                return res.status(200).json(item);
            }
            noResult(res);
        } catch (err) {
            errorCatcher(next, err);
        }
    }
};

module.exports = {getCtrlFn};