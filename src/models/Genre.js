const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

const genreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Users,
        required: true
    },
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

genreSchema.statics.getAll = modelUtil.getAll;

genreSchema.statics.getOne = modelUtil.getOne;

genreSchema.statics.getById = modelUtil.getById;

genreSchema.statics.disable = modelUtil.disable;

genreSchema.statics.disableById = modelUtil.disableById;

const Genres = model(SCHEMES_NAMES.Genres, genreSchema);

module.exports = {Genres};