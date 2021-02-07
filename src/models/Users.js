const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {USER_ROLES, ALL_USER_ROLES} = require("../roles.js");
const {SCHEMES_NAMES} = require('../utility/constants');
const {Genres} = require('./Genre');

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
    },
    permission: {
        genre: [
            {
                type: Schema.Types.ObjectId,
                ref: SCHEMES_NAMES.Books
            }
        ],
        limit: {
            type: Number,
            required: true
        },
        premium: {
            type: Boolean,
            default: false,
        }
    },
}, {timestamps: true});

userSchema.statics.getAll = modelUtil.getAll;

userSchema.statics.getOne = modelUtil.getOne;

userSchema.statics.getById = modelUtil.getById;

userSchema.statics.disable = modelUtil.disable;

userSchema.statics.disableById = modelUtil.disableById;

userSchema.methods.addDefaultPermission = async function () {
    const firstGenre = await Genres.getOne({});
    this.permission.genre.push(firstGenre._id);
    this.permission.premium = false;
    // return this.save();
};


userSchema.methods.premiumPermission = async function() {
    this.permission.genre.length = 0;
    this.permission.premium = true;

    // return this.save();
};

const Users = model(SCHEMES_NAMES.Users, userSchema);

module.exports = {Users};