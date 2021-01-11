const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Authors} = require("../models/Author");


async function addAuthor(req, res, next) {
    const {name, genre} = req.body;
    try {
        errorValidation(req);
        const newBook = new Authors({name, genre});
        if (await newBook.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.BOOK_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editAuthor(req, res, next) {
    const {name, genre} = req.body;
    try {
        errorValidation(req);
        const book = await Authors.getById(req.params.id); //TODO check pass option
        book.name = name;
        book.genre = genre;

        if (await book.save()) {
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