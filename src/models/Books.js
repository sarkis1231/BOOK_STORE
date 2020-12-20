const {Schema,model} = require("mongoose");

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genres',
        required: true
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});



bookSchema.statics.get = async function () {

};

bookSchema.statics.getOne = async function () {

};

bookSchema.statics.getById = async function () {

};

bookSchema.statics.disable = async function () {

};

bookSchema.statics.disableById = async function () {

};

const Books = model('Books', bookSchema);

module.exports = {Books};
