const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

let bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Genres,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Authors,
    },
    image: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date
    },
    pageCount: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

bookSchema = modelUtil.addSchemaStaticFunctions(bookSchema);

const Books = model(SCHEMES_NAMES.Books, bookSchema);

module.exports = {Books};
