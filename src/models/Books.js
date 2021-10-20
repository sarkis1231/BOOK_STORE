const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');
const CustomSchema = require("../CustomSchema");

let bookSchema = new CustomSchema({
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

const Books = model(SCHEMES_NAMES.Books, bookSchema);

module.exports = {Books};
