const {messageAlert,MESSAGES} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher,errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Genres} = require("../models/Genre");


async function addGenre(req, res, next) {
    const {name} = req.body;
    try {
        errorValidation(req);
        const newGenre = new Genres({name});
        if (await newGenre.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.GENRE_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editGenre(req, res, next) {
    const {name, genre} = req.body;
    try {
        errorValidation(req);
        const book = await Genres.getById(req.params.id); //TODO check pass option
        book.name = name;
        book.genre = genre;

        if (await book.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let getGenres = getCtrlFn.getAll(Genres);

let getGenre = getCtrlFn.getId(Genres);

let deleteGenre = getCtrlFn.Delete(Genres);

module.exports = {getGenres, getGenre, addGenre, editGenre, deleteGenre};