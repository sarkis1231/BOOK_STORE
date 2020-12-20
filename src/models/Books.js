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
        type: String
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});

const Books = model('Books', bookSchema);

//TODO get and delete with disabled functionality in mind

module.exports = {Books};