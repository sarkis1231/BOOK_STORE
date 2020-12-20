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



genreSchema.statics.get = async function () {

};

genreSchema.statics.getOne = async function () {

};

genreSchema.statics.getById = async function () {

};

genreSchema.statics.disable = async function () {

};

genreSchema.statics.disableById = async function () {

};

const Genres = model('Genres', genreSchema);

module.exports = {Genres};