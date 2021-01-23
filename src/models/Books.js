const modelUtil = require("../utility/model");
const {Schema,model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

const bookSchema = new Schema({
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
    disabled: {
        type:Boolean
    }
},{timestamps:true});

bookSchema.statics.getAll = modelUtil.getAll;

bookSchema.statics.getOne =  modelUtil.getOne;

bookSchema.statics.getById = modelUtil.getById;

bookSchema.statics.disable =  modelUtil.disable;

bookSchema.statics.disableById = modelUtil.disableById;

const Books = model(SCHEMES_NAMES.Books, bookSchema);

module.exports = {Books};
