const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: SCHEMES_NAMES.Books
        }
    ],
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

authorSchema.statics.getAll = modelUtil.getAll;

authorSchema.statics.getOne = modelUtil.getOne;

authorSchema.statics.getById = modelUtil.getById;

authorSchema.statics.disable = modelUtil.disable;

authorSchema.statics.disableById = modelUtil.disableById;

const Authors = model(SCHEMES_NAMES.Authors, authorSchema);

module.exports = {Authors};