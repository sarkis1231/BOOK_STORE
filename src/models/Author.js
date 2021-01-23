const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: SCHEMES_NAMES.Books
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

authorSchema.statics.addBookAuthor = async function (authorId, bookId) {
    let author = await this.getById(authorId);
    if (!author) {
        return Promise.reject('Invalid Id')
    }
    author.books.push(bookId);
    return author.save();
};

authorSchema.statics.deleteBookAuthor = async function (authorId,bookId) {
    let authorDisabled = await this.getById(authorId);
    if (!authorDisabled) {
        return Promise.reject('Invalid Id')
    }
    authorDisabled.books = authorDisabled.books.filter(function (bId){
        return bId !== bookId;
    });
    return authorDisabled.save();
};

const Authors = model(SCHEMES_NAMES.Authors, authorSchema);

module.exports = {Authors};