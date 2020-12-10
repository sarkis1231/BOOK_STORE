const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const {USER_ROLES, ALL_USER_ROLES} =  require("../roles.js");

//TODO Reigon creation + telephone number
//TODO citezenship

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
        default: "Admin",
        // enum: ALL_USER_ROLES
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});

const Users = mongoose.model('Users', userSchema);

module.exports = {Users};