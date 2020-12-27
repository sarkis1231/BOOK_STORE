const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");

const genreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

genreSchema.statics.get = modelUtil.get;

genreSchema.statics.getOne = modelUtil.getOne;

genreSchema.statics.getById = modelUtil.getById;

genreSchema.statics.disable = modelUtil.disable;

genreSchema.statics.disableById = modelUtil.disableById;

const Genres = model('Genres', genreSchema);

module.exports = {Genres};