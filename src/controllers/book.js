const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher} = require("../utility/controllers/errors");
const {errorValidation} = require("../utility/controllers/errors");
const {Books} = require("../models/Books");


async function addBook(req, res, next) {

    try {
        errorValidation(req);

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editBook(req, res, next) {

    try {
        errorValidation(req);

    } catch (err) {
        errorCatcher(next, err);
    }
}

let deleteBook = getCtrlFn.Delete(Books);

module.exports = {addBook,editBook,deleteBook};