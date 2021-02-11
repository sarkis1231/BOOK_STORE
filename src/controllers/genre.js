const modelUtil = require("../utility/model");
const {noResult} = require("../utility/controllers/messages");
const {Fn} = require("../utility/functions");
const {messageAlert, MESSAGES} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher, errorValidation} = require("../utility/controllers/errors");
const {alert} = require("../utility/controllers/messages");
const {Genres} = require("../models/Genre");


async function addGenre(req, res, next) {
    const {name} = req.body;
    try {
        errorValidation(req);
        const newGenre = new Genres({name, userId: req.user._id});
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
        const book = await Genres.getById(req.params.id);
        book.name = name;
        book.genre = genre;

        if (await book.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function getGenres(req, res, next) {
    let query = await modelUtil.getQueryWithPermission(req.user);

    let q = {}

    if (!Fn.isArray(query)) { //regular case
        let genreIdList = query.map(function (item) {
            return item.id
        });
        q = {_id: {$in: genreIdList}};
    }

    let items = await Genres.getAll(q, false, true);
    if (!Fn.isEmpty(items)) {
        return res.status(200).json(items);
    }
    return noResult(res);
}

let getGenre = getCtrlFn.getId(Genres);

let deleteGenre = getCtrlFn.Delete(Genres);

module.exports = {getGenres, getGenre, addGenre, editGenre, deleteGenre};