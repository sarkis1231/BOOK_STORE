const modelUtil = require("../utility/model");
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
    query = modelUtil.getQueryWithDisable(query);
    return this.find(query);
};

genreSchema.statics.getOne = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.findOne(query);
};

genreSchema.statics.getById = async function (id) {
    let query = modelUtil.getQueryWithDisable();
    query.id = id;
    return this.findById(query);
};

genreSchema.statics.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query,{
        $set:{
            disable:true
        }
    });

};

genreSchema.statics.disableById = async function (query) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};

const Genres = model('Genres', genreSchema);

module.exports = {Genres};