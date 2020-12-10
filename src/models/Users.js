import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
const {Roles, ROLES_ALL} =  require("../roles");

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
        default: Roles.Admin,
        enum: ROLES_ALL
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});

const Users = mongoose.model('Users', userSchema);

exports = {Users};