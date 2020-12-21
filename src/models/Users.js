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
    return this.find(query);
};

userSchema.statics.getOne = async function (query) {
    return this.findOne(query);
};

userSchema.statics.getById = async function (query) {
    return this.findById(id);
};

userSchema.statics.disable = async function (query) {
    //setting disable to true with a promise array and promise all
};

userSchema.statics.disableById = async function (query) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};


const Users = model('Users', userSchema);

//TODO get and delete with disabled functionality in mind with statics

module.exports = {Users};