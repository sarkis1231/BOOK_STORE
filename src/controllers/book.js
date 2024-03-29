const modelUtil = require("../utility/model");
const UTIL = require("../utility/controllers/util");
const {Fn} = require("../utility/functions");
const {MESSAGES, messageAlert} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher, errorValidationFiles, errorThrower, errorValidation} = require("../utility/controllers/errors");
const {alert, noResult} = require("../utility/controllers/messages");
const {Books} = require("../models/Books");
const {Authors} = require("../models/Author");


async function addBook(req, res, next) {
    const {name, genre, author, pageCount, publishedDate} = req.body;


    try {
        errorValidationFiles(req, ['file', 'image']);

        // TODO maybe add streams
        let file = req.files.file[0].path;
        let image = req.files.image[0].path;

        let book = {
            name, genre, author, file, image, pageCount
        };

        if (!Fn.isEmpty(publishedDate)) {
            book.publishedDate = new Date(publishedDate);
        }
        const newBook = new Books(book);

        const p1 = newBook.save();
        const p2 = Authors.addBookAuthor(author, newBook._id);
        const p = await Promise.all([p1, p2]);

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

async function getBooksWithFilter(req, res, next) {
    const {name, genre, author, pageCount, publishedDate,index,limitBy} = req.query;
    try {
        errorValidation(req);
        let query = {
            name: name ? {$regex: new RegExp(name), $options: 'gi'} : undefined,
            genre: genre ? Fn.toObjectId(genre) : undefined,
            author: author ? Fn.toObjectId(author) : undefined,
            pageCount: pageCount ? {$gte: parseInt(pageCount)} : undefined,
            publishedDate: publishedDate ? {$gte: new Date(publishedDate)} : undefined,
        };

        query = Fn.sanitizeQuery(query);

        let permissionQuery = await modelUtil.getQueryWithPermission(req.user);

        let aggregateArray = UTIL.getBooksFilterAggregate({index,limitBy,query});

        let books = [];

        let booksPromise = [];

        let count = Books.countDocuments(modelUtil.getQueryWithDisable({}));

        let data = null;

        if (Fn.isArray(permissionQuery)) { //non regular case
            for (let i = 0; i < permissionQuery.length; i++) {
                let subAggregate = [...aggregateArray];
                let item = permissionQuery[i];
                let firstElement = subAggregate[0];
                subAggregate[0] = ({$limit: item.limit});
                subAggregate.unshift({$match: {genre: item.id}});
                subAggregate.unshift(firstElement);
                booksPromise.push(Books.aggregate(subAggregate));
            }
            books = Promise.all(booksPromise);

            data = await Promise.all([books,count]);

            data[0] = [].concat(...data[0]); // 2d array to 1d

        } else {
            books = Books.aggregate(aggregateArray); //promise
            data = await Promise.all([books,count]);
        }


		let result = {
	    	data: data[0],
	    	totalLength: data[1]
        };

        if (!Fn.isEmpty(data) && !Fn.isEmpty(data[0]) && !Fn.isEmpty(data[1])) {
            return res.status(200).json(result);
        }
        noResult(res);

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function getBooks(req, res, next) {
    try {
        let query = await modelUtil.getQueryWithPermission(req.user);

        let aggregateArray = [];

        aggregateArray.push({$match: {disabled: {$ne: true}}});

        if (Fn.isArray(query)) { //non regular case
            for (let i = 0; i < query.length; i++) {
                let item = query[i]
                aggregateArray.push({$match: {genre: item.id}});
                aggregateArray.push({$limit: item.limit});
            }
        }

        let items = await Books.aggregate(aggregateArray);

        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        return noResult(res);

    } catch (err) {
        errorCatcher(err);
    }
}

let getBook = getCtrlFn.getId(Books);

async function deleteBook(req, res, next) {
    try {
        errorValidation(req);
        const p1 = await Books.disableById(req.params.id);
        if (Fn.isEmpty(p1)) {
            return errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
        }
        const p2 = await Authors.deleteBookAuthor(p1.author, req.params.id);
        if (!Fn.isEmpty(p2)) {
            return alert(res, 200, messageAlert.success, MESSAGES.ITEM_DELETED);
        }
        return errorThrower(MESSAGES.SOMETHING_WENT_WRONG, 422);

    } catch (err) {
        errorCatcher(next, err);
    }
}


module.exports = {getBook, getBooks, addBook, editBook, deleteBook, getBooksWithFilter};
