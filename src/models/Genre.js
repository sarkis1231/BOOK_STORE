const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');
const {CustomSchema} = require("../mongoose_custom");

let genreSchema = new CustomSchema({
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

const Genres = model(SCHEMES_NAMES.Genres, genreSchema);

module.exports = {Genres};