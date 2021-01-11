const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Authors} = require("../models/Author");


async function addAuthor(req, res, next) {
    const {name, genre} = req.body; //TODO change me
    try {
        errorValidation(req);
        const newAuthor = new Authors({name, genre});
        if (await newAuthor.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.BOOK_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editAuthor(req, res, next) {
    const {name, genre} = req.body; //TODO change me
    try {
        errorValidation(req);
        const author = await Authors.getById(req.params.id); //TODO check pass option
        author.name = name;//TODO change me
        author.genre = genre;//TODO change me

        if (await author.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let getAuthors = getCtrlFn.getAll(Authors);

let getAuthor = getCtrlFn.getId(Authors);

let deleteAuthor = getCtrlFn.Delete(Authors);

module.exports = {addAuthor, editAuthor, getAuthors, getAuthor, deleteAuthor};