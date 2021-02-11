const modelUtil = require("../model");
const {MESSAGES, messageAlert} = require("../constants");
const {errorValidation, errorThrower, errorCatcher} = require("./errors");
const {Fn} = require("../functions");
const {alert, noResult} = require("./messages");

let getCtrlFn = {};

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

getCtrlFn.getAll = function (myModel,withPermission) {
    if (!modelUtil.isModel(myModel)) {
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function (req, res, next) {
        let query = {};
        if (withPermission) {
            query = modelUtil.getQueryWithPermission(req.user);
        }
        if (!Fn.isArray(query)) {
            let items = await myModel.getAll(query, false, true);
            if (!Fn.isEmpty(items)) {
                return res.status(200).json(items);
            }
            return noResult(res);
        }

        for (let q = 0; q < query.length; q++) {

        }

    }
};

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

module.exports = {getCtrlFn};