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
    return this.find(query);
};

genreSchema.statics.getOne = async function (query) {
    return this.findOne(query);
};

genreSchema.statics.getById = async function (id) {
    return this.findById(id);
};

genreSchema.statics.disable = async function (query) {
//setting disable to true with a promise array and promise all
};

genreSchema.statics.disableById = async function (query) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};

const Genres = model('Genres', genreSchema);

module.exports = {Genres};