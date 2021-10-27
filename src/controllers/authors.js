const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Authors} = require("../models/Author");
const {clearRedisKey} = require("../utility/cache");


async function addAuthor(req, res, next) {
    const {name} = req.body;
    try {
        errorValidation(req);
        const newAuthor = new Authors({name});
        if (await newAuthor.save()) {
            await clearRedisKey(Authors.collection.collectionName);
            return alert(res, 200, messageAlert.success, MESSAGES.AUTHOR_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editAuthor(req, res, next) {
    const {name} = req.body;
    try {
        errorValidation(req);
        const author = await Authors.getById(req.params.id, {
            cache: true
        });
        author.name = name;

        if (await author.save()) {
            await clearRedisKey(Authors.collection.collectionName);
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let getAuthors = getCtrlFn.getAll(Authors, true);

let getAuthor = getCtrlFn.getId(Authors, true);

let deleteAuthor = getCtrlFn.Delete(Authors, true);

module.exports = {addAuthor, editAuthor, getAuthors, getAuthor, deleteAuthor};