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

userSchema.methods.addEditPermission = function (permissionArray) {
    const permission = Permissions.getById(this.permission);

    let permissionObj = Fn.arrayToObj(permission.genre, 'id');
    let newPermissions = [];

    for (let i = 0; i < permissionArray.length; i++) {
        let genreId = permissionArray[i].genre;
        let limit = permissionArray[i].limit;
        if (permissionObj[genreId]) {
            permissionObj.limit = limit;
        } else {
            newPermissions.push({
                id: genreId,
                limit: limit
            });
        }
    }

    permission.genre = [...Object.values(permissionObj), ...newPermissions];

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