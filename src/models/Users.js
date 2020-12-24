const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {USER_ROLES, ALL_USER_ROLES} = require("../roles.js");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: USER_ROLES.User,
        enum: ALL_USER_ROLES
    },
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

userSchema.statics.get = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.find(query);
};

userSchema.statics.getOne = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.findOne(query);
};

userSchema.statics.getById = async function (id) {
    let query = modelUtil.getQueryWithDisable();
    query.id = id;
    return this.findById(query);
};

userSchema.statics.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query,{
        $set:{
            disable:true
        }
    });
};

userSchema.statics.disableById = async function (query) {
    return this.findByIdAndUpdate(id,{disabled:true});
};

const Users = model('Users', userSchema);

module.exports = {Users};