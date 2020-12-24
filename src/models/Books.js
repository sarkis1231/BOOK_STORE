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
    query = modelUtil.getQueryWithDisable(query);
    return this.find(query);
};

bookSchema.statics.getOne = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.findOne(query);
};

bookSchema.statics.getById = function (id) {
    let query = modelUtil.getQueryWithDisable();
    query.id = id;
    return this.findById(query);
};

bookSchema.statics.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query,{
        $set:{
            disable:true
        }
    });

};

bookSchema.statics.disableById = async function (id) {
    return  this.findByIdAndUpdate(id,{disabled:true});
};

const Books = model('Books', bookSchema);

module.exports = {Books};
