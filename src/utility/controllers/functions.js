const modelUtil = require("../model");
const {MESSAGES, messageAlert} = require("../constants");
const {errorValidation, errorThrower, errorCatcher} = require("./errors");
const {Fn} = require("../functions");
const {alert, noResult} = require("./messages");
const {clearRedisKey} = require("../cache");

let getCtrlFn = {};

/**
 * @description get command for model Route wrap up
 * @param myModel {Model}
 * @param deleteCache {Boolean=}
 * */
getCtrlFn.Delete = function (myModel, deleteCache=false) {
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
            if(deleteCache) {
                await clearRedisKey(myModel.collection.collectionName);
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
 * @param cache {Boolean}
 * */
getCtrlFn.getAll = function (myModel,cache=false) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        let items = await myModel.getAll({}, {
            ignore: false,
            lean: true
        });
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    }
};

/**
 * @description get command for model Route wrap up
 * @param myModel {Model}
 * @param cache {Boolean}
 * */
getCtrlFn.getId = function (myModel,cache=false) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        try {
            errorValidation(req);

            // leaned object
            const item = await myModel.getById(req.params.id, {
                ignore: false,
                lean: true,
                cache: cache
            });
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