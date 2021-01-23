const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidationFiles} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Books} = require("../models/Books");
const {Fn} = require("../utility/functions");


async function addBook(req, res, next) {
    const {name, genre,author} = req.body;


    try {
        errorValidationFiles(req,['file','image']);

        let file = req.files.file[0].path;
        let image = req.files.image[0].path;


        const newBook = new Books({name, genre,author,file,image});
       if (await newBook.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.BOOK_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editBook(req, res, next) {
    const {name, genre,author} = req.body;

    try {
        errorValidationFiles(req,['file','image']);

        let file = req.files.file;
        let image = req.files.image;

        const book = await Books.getById(req.params.id); //TODO check pass option
        book.name = name;
        book.genre = genre;
        book.author = author;
        book.file  = file;
        book.image  = image;

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