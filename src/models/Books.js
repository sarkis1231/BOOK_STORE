const {Schema,model} = require("mongoose");

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    sub_genre: {
        type: String,
        required: true
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});

const Books = model('Books', bookSchema);

module.exports = {Books};