const modelUtil = require("../utility/model");
const {Fn} = require("../utility/functions");
const {LIMITS} = require("../utility/constants");
const {Schema, model} = require("mongoose");
const {USER_ROLES, ALL_USER_ROLES} = require("../roles.js");
const {SCHEMES_NAMES} = require('../utility/constants');
const {Genres} = require('./Genre');
const {Permissions} = require('./Permisssions');


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
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Permissions,
        required: true
    },
}, {timestamps: true});

userSchema.statics.getAll = modelUtil.getAll;

userSchema.statics.getOne = modelUtil.getOne;

userSchema.statics.getById = modelUtil.getById;

userSchema.statics.disable = modelUtil.disable;

userSchema.statics.disableById = modelUtil.disableById;

userSchema.methods.createDefaultPermission =  async function () {
    const firstGenre = await Genres.getOne({});
    const permission = new Permissions();
    permission.genre = [{
        id:firstGenre._id,
        limit:LIMITS.min
    }];
    permission.uid = this._id;
    this.permission = permission._id;
    return Promise.all([this.save(),permission.save()]);
};

userSchema.methods.premiumPermission =  function () {
    const permission = Permissions.getById(this.permission);
    permission.genre.length = 0;
    permission.premium = true;
    return permission.save();
};

userSchema.methods.addEditGenre = function (genreId, limit) {
    limit = LIMITS[limit] || LIMITS['min'];
    const permission = Permissions.getById(this.permission);

    // TODO  maybe hash it for Algorithmic speed
    let permissionIndex = permission.genre.indexOf(function (item) {
        return Fn.sameObjectId(item.id, genreId);
    });

    if (permissionIndex !== -1) {
        permission.genre[permissionIndex].limit = limit;
        return permission.save();
    }

    permission.genre.push({
        id: genreId,
        limit: limit
    });

    return permission.save();
};

userSchema.methods.removeGenrePermission = function (genreId){
    const permission = Permissions.getById(this.permission);

    permission.genre = permission.genre.filter(function (genre) {
        return !Fn.sameObjectId(genreId,genre._id);
    });

    return permission.save();
};

const Users = model(SCHEMES_NAMES.Users, userSchema);

module.exports = {Users};