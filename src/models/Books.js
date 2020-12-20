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



bookSchema.statics.get = async function (query) {
    return this.findById(query);
};

bookSchema.statics.getOne = async function (query) {
    return this.findOne(query);
};

bookSchema.statics.getById = function (id) {
    return this.findById(id);
};

bookSchema.statics.disable = async function (query) {
    //setting disable to true;
};

bookSchema.statics.disableById = async function (id) {

};

const Books = model('Books', bookSchema);

module.exports = {Books};
