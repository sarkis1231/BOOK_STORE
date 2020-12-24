const modelUtil = require("../utility/model");
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
    return this.find(query);
};

bookSchema.statics.getOne = async function (qry) {
    let query = {...qry,disabled: {$ne: true}}
    return this.findOne(query);
};

bookSchema.statics.getById = function (id) {
    return this.findById(id);
};

bookSchema.statics.disable = async function (query) {
    //setting disable to true with a promise array and promise all
};

bookSchema.statics.disableById = async function (id) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};

const Books = model('Books', bookSchema);

module.exports = {Books};
