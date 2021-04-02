const {errorCatcher} = require("../utility/controllers/errors");
const {Fn} = require("../utility/functions");
const {noResult} = require("../utility/controllers/messages");
const {errorValidation} = require("../utility/controllers/errors");
const {Permissions} = require("../models/Permisssions");

async function getPermissions(req, res, next) {
    try {
        errorValidation(req);
        let items = await Permissions.find(
            {disabled: {$ne: true}},
            {'createdAt': 0, 'updatedAt': 0})
            .populate({
                path: 'genre.id', select: 'name'
            })
            .populate({
                path: 'uid', select: 'name email'
            })
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}


async function getPermission(req, res, next) {
    try {
        errorValidation(req);
        let items = await Permissions.find(
            {id:req.params.id,
                disabled: {$ne: true}},
            {'createdAt': 0, 'updatedAt': 0})
            .populate({
                path: 'genre.id', select: 'name'
            })
            .populate({
                path: 'uid', select: 'name email'
            })
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

module.exports = {getPermissions,getPermission};