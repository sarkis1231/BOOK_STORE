const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Authors',
        required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Books'
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

const Authors = model('Authors', authorSchema);

module.exports = {Authors};