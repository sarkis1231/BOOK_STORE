const modelUtil = require("../utility/model");
const {Fn} = require("../utility/functions");
const {messageAlert, MESSAGES} = require("../utility/constants");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher, errorValidation} = require("../utility/controllers/errors");
const {alert, noResult} = require("../utility/controllers/messages");
const {Genres} = require("../models/Genre");
const {clearRedisKey} = require("../utility/cache");


async function addGenre(req, res, next) {
    const {name} = req.body;
    try {
        errorValidation(req);
        const newGenre = new Genres({name, userId: req.user._id});
        if (await newGenre.save()) {
            await clearRedisKey(Genres.collection.collectionName);
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
        const book = await Genres.getById(req.params.id, {
            cache: true
        });
        book.name = name;
        book.genre = genre;

        if (await book.save()) {
            await clearRedisKey(Genres.collection.collectionName);
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

async function getGenres(req, res, next) {
    try {
        let query = await modelUtil.getQueryWithPermission(req.user);

        let q = {}
        if (Fn.isArray(query)) { //non regular case
            let genreIdList = query.map(function (item) {
                return item.id
            });
            q = {_id: {$in: genreIdList}};
        }

        let items = await Genres.getAll(q, {
            ignore: false,
            lean: true,
            cache: true
        });
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        return noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

let getGenre = getCtrlFn.getId(Genres, true);

let deleteGenre = getCtrlFn.Delete(Genres, true);

module.exports = {getGenres, getGenre, addGenre, editGenre, deleteGenre};