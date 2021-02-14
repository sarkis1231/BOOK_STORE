const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

let genreSchema = new Schema({
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

genreSchema = modelUtil.addSchemaStaticFunctions(genreSchema);

const Genres = model(SCHEMES_NAMES.Genres, genreSchema);

module.exports = {Genres};