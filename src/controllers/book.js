const {noResult} = require("../utility/controllers/messages");
const {errorThrower} = require("../utility/controllers/errors");
const {errorValidation} = require("../utility/controllers/errors");
const {Fn} = require("../utility/functions");
const {MESSAGES,messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidationFiles} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Books} = require("../models/Books");
const {Authors} = require("../models/Author");


async function addBook(req, res, next) {
    const {name, genre,author,pageCount,publishedDate} = req.body;


    try {
        errorValidationFiles(req,['file','image']);

        let file = req.files.file[0].path;
        let image = req.files.image[0].path;

        let book = {
            name, genre, author, file, image, pageCount
        };

        if (!Fn.isEmpty(publishedDate)){
            book.publishedDate = new Date(publishedDate);
        }
       const newBook = new Books(book);

       const p1 = newBook.save();
       const p2 = Authors.addBookAuthor(author,newBook._id);
       const p = await Promise.all([p1,p2]);

        if (!Fn.isEmpty(p) && (!Fn.isEmpty(p[0]) || !Fn.isEmpty(p[1]))) {
            return alert(res, 200, messageAlert.success, MESSAGES.BOOK_ADDED);
        }

        errorThrower(MESSAGES.SOMETHING_WENT_WRONG, 422);

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editBook(req, res, next) {
    const {name, genre, author, pageCount, publishedDate} = req.body;

    try {
        errorValidationFiles(req, ['file', 'image']);

        let file = req.files.file[0].path;
        let image = req.files.image[0].path;

        const book = await Books.getById(req.params.id);
        book.name = name ? name : book.name;
        book.genre = genre ? genre : book.genre;
        book.file = file ? file : book.file;
        book.image = image ? image : book.image;
        book.publishedDate = publishedDate ? new Date(publishedDate) : book.publishedDate;
        book.pageCount = pageCount ? pageCount : book.pageCount;

        let p2, p3;

        if (!Fn.sameObjectId(book.author, author)) {
            p2 = Authors.deleteBookAuthor(book.author, req.params.id);
            book.author = author;
            p3 = Authors.addBookAuthor(book.author, book._id)
        }

        const p1 = book.save();
        const p = await Promise.all([p1, p2, p3]);

        if (!Fn.isEmpty(p) && !Fn.isEmpty(p[0]) && !Fn.isEmpty(p[1]) && !Fn.isEmpty(p[2])) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }
        return errorThrower(MESSAGES.SOMETHING_WENT_WRONG, 422);

    } catch (err) {
        errorCatcher(next, err);
    }
}

let getBooksWithFilter = async function(req, res, next) {
    const {name, genre,author,pageCount,publishedDate} = req.body;
    try {
       errorValidation(req);
        let query = {
            name: {$regex: new RegExp(name), $options: 'g'},
            genre: genre,
            author: author,
            pageCount: pageCount ? {$gte: pageCount} : undefined,
            publishedDate: publishedDate ? {$gte: new Date(pageCount)} : undefined
        };

        query = Fn.sanitizeQuery(query);

        let books = await Books.getAll(query, {'createdAt': 0, 'updatedAt': 0, file: 0, image: 0}, true);
        if (!Fn.isEmpty(books)) {
            return res.status(200).json(books);
        }
        noResult(res);

    } catch (err){
        errorCatcher(next, err);
    }
}

let getBooks = getCtrlFn.getAll(Books);

let getBook = getCtrlFn.getId(Books);

async function deleteBook (req,res,next) {
    try {
        errorValidation(req);
        const p1 = await Books.disableById(req.params.id);
        if (Fn.isEmpty(p1)) {
            return errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
        }
        const p2 = await Authors.deleteBookAuthor(p1.author,req.params.id);
        if(!Fn.isEmpty(p2)) {
            return alert(res, 200, messageAlert.success, MESSAGES.ITEM_DELETED);
        }
        return errorThrower(MESSAGES.SOMETHING_WENT_WRONG, 422);

    } catch (err) {
        errorCatcher(next, err);
    }
}


module.exports = {getBook, getBooks, addBook, editBook, deleteBook,getBooksWithFilter};