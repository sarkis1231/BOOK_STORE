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



genreSchema.statics.get = async function (query) {

};

genreSchema.statics.getOne = async function (query) {

};

genreSchema.statics.getById = async function (query) {

};

genreSchema.statics.disable = async function (query) {

};

genreSchema.statics.disableById = async function (query) {

};

const Genres = model('Genres', genreSchema);

module.exports = {Genres};