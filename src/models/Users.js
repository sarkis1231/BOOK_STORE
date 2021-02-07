const modelUtil = require("../utility/model");
const {Fn} = require("../utility/functions");
const {LIMITS} = require("../utility/constants");
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
                id: {
                    type: Schema.Types.ObjectId,
                    ref: SCHEMES_NAMES.Books,
                    required: true
                },
                limit: {
                    type: Number,
                    default: LIMITS.min,
                    required: true
                }
            }
        ],
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

userSchema.methods.addDefaultPermission =  async function () {
    const firstGenre = await Genres.getOne({});
    this.permission.genre.push({
        id: firstGenre._id,
        limit: LIMITS.min
    });
    this.permission.premium = false;
};

userSchema.methods.premiumPermission =  function () {
    this.permission.genre.length = 0;
    this.permission.premium = true;
};

userSchema.methods.addGenre = function (genreId, limit) {
    limit = LIMITS[limit] || LIMITS['min'];
    this.permission.genre.push({
        id: genreId,
        limit: limit
    });
};

userSchema.methods.editLimitGenre =  function (genreId, limit) {
    limit = LIMITS[limit] || LIMITS['min'];
    this.permission.genre = this.permission.genre.map(function (genre) {
        if (Fn.sameObjectId(genre._id, genreId)) {
            genre.limit = limit;
        }
        return genre;
    });
};

userSchema.methods.removeGenrePermission = function (genreId){
    this.permission.genre = this.permission.genre.filter(function (genre) {
        return !Fn.sameObjectId(genreId,genre._id);
    });
};

const Users = model(SCHEMES_NAMES.Users, userSchema);

module.exports = {Users};