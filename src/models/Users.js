const {Fn} = require("../utility/functions");
const {LIMITS,SCHEMES_NAMES} = require("../utility/constants");
const {Schema, model} = require("mongoose");
const {USER_ROLES, ALL_USER_ROLES} = require("../roles.js");
const {Genres} = require('./Genre');
const {Permissions} = require('./Permisssions');
const {CustomSchema} = require("../mongoose_custom");


let userSchema = CustomSchema({
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

userSchema.methods.isAdmin = function () {
    return this.role === USER_ROLES.Admin;
};

userSchema.methods.createDefaultPermission = async function () {
    const firstGenre = await Genres.getOne({});
    const permission = new Permissions();
    permission.genre = [{
        id: firstGenre._id,
        limit: LIMITS.min
    }];
    permission.uid = this._id;
    this.permission = permission._id;
    return Promise.all([this.save(), permission.save()]);
};

userSchema.methods.premiumPermission = async function () {
    const permission = await Permissions.getById(this.permission);
    permission.genre.length = 0;
    permission.premium = true;
    return permission.save();
};

userSchema.methods.addEditPermission = async function (permissionArray) {
    const permission = await Permissions.getById(this.permission);

    let permissionObj = Fn.arrayToObj(permission.genre, 'id');
    let newPermissions = [];

    for (let i = 0; i < permissionArray.length; i++) {
        let genreId = permissionArray[i].genreId;
        let limit = permissionArray[i].limit;
        if (permissionObj[genreId]) {
            permissionObj[genreId].limit = limit;
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

userSchema.methods.removeGenrePermission = async function (genreId) {
    const permission = await Permissions.getById(this.permission);

    permission.genre = permission.genre.filter(function (genre) {
        return !Fn.sameObjectId(genreId, genre._id);
    });

    return permission.save();
};

const Users = model(SCHEMES_NAMES.Users, userSchema);

module.exports = {Users};