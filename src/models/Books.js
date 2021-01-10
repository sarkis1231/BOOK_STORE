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

bookSchema.statics.getAll = modelUtil.getAll;

bookSchema.statics.getOne =  modelUtil.getOne;

bookSchema.statics.getById = modelUtil.getById;

bookSchema.statics.disable =  modelUtil.disable;

bookSchema.statics.disableById = modelUtil.disableById;

const Books = model('Books', bookSchema);

module.exports = {Books};
