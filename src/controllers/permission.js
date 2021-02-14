const {errorCatcher} = require("../utility/controllers/errors");
const {Fn} = require("../utility/functions");
const {noResult} = require("../utility/controllers/messages");
const {errorValidation} = require("../utility/controllers/errors");

async function getPermission(req, res, next) {
    try {
        errorValidation(req);
        let items = await Users.find(
            {_id: {$ne: userId}, disabled: {$ne: true}},
            {'password': 0, 'updatedAt': 0})
            .populate({
                path: 'permission', populate: {
                    path: 'genre.id',
                    select: 'name'
                }, select: 'genre'
            })
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

module.exports = {getPermission};