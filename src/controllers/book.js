const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Books} = require("../models/Books");


async function addBook(req, res, next) {
    const {name, genre} = req.body;
    try {
        errorValidation(req);
        const newBook = new Books({name, genre});
        if (await newBook.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.BOOK_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editBook(req, res, next) {
    const {name, genre} = req.body;
    try {
        errorValidation(req);
        const book = await Books.getById(req.params.id); //TODO check pass option
        book.name = name;
        book.genre = genre;

        if (await book.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let getBooks = getCtrlFn.getAll(Books);

let getBook = getCtrlFn.getId(Books);

let deleteBook = getCtrlFn.Delete(Books);

module.exports = {getBook, getBooks, addBook, editBook, deleteBook};