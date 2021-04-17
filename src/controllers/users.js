const {SECRET_KEY} = require("../config/keys");
const {sign} = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {Fn} = require("../utility/functions");
const {getCtrlFn} = require("../utility/controllers/functions");
const {Users} = require("../models/Users");
const {MESSAGES, messageAlert, LIMITS} = require("../utility/constants");
const {errorCatcher, errorValidation} = require("../utility/controllers/errors");
const {alert, noResult} = require("../utility/controllers/messages");


async function register(req, res, next) {
    try {
        errorValidation(req);

        const {email, name, password} = req.body;
        const newUser = new Users({email, name, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        if (!Fn.isEmpty(await newUser.createDefaultPermission())) {
            return alert(res, 200, messageAlert.success, MESSAGES.USER_REGISTERED_SUCCESSFULLY);
        }
        alert(res, 304, messageAlert.success, MESSAGES.NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function login(req, res, next) {
    const {email, password} = req.body;
    try {
        errorValidation(req);

        const user = await Users.getOne({email});

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({email: MESSAGES.WRONG_AUTH});
        }
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        const token = await sign(payload, SECRET_KEY, {expiresIn: 3600});
        res.status(200).json({success: true, token: `Bearer ${token}`});

    } catch (err) {
        errorCatcher(next, err);
    }

}

async function editUser(req, res, next) {
    const {name, email} = req.body;
    try {
        errorValidation(req);
        const user = await Users.getOne({_id: req.params.id});
        user.name = name;
        user.email = email;

        if (await user.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editUserPermission(req, res, next) {
    const {premium, genre, limit} = req.body;
    try {
        errorValidation(req);
        const user = await Users.getById(req.params.id);

        if (!Fn.isEmpty(premium)) {

            if (await user.premiumPermission()) {
                return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
            }
            return alert(res, 200, messageAlert.success, MESSAGES.SOMETHING_WENT_WRONG);
        }

        if (Fn.isEmpty(genre) || Fn.isEmpty(limit)) {
            return res.status(400).json(
                {
                    "data": {
                        "genre": MESSAGES.REQUIRED_FIELDS,
                        "limit": MESSAGES.REQUIRED_FIELDS,
                    }
                }
            );
        }

        const permissionArray = [];
        for (let i = 0; i < genre.length; i++) {
            permissionArray.push({
                genreId: genre[i],
                limit: LIMITS[limit[i]]
            })
        }

        if (await user.addEditPermission(permissionArray)) {
            return alert(res, 200, messageAlert.success, MESSAGES.VALUE_IS_CHANGED);
        }
        return alert(res, 200, messageAlert.success, MESSAGES.SOMETHING_WENT_WRONG);

    } catch (err) {
        errorCatcher(next, err);
    }
}


async function changePassword(req, res, next) {
    const {password} = req.body;
    try {
        errorValidation(req);
        const user = await Users.getById(req.params.id);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        if (await user.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.PASSWORD_IS_CHANGED);
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

let getUser = getCtrlFn.getId(Users);

async function getUsers(req, res, next) {
    try {
        errorValidation(req);
        let userId = req['user']._id;
        let items = await Users.find({_id: {$ne: userId}, disabled: {$ne: true}},
            {'password': 0, 'updatedAt': 0, 'permission': 0})
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

let deleteUser = getCtrlFn.Delete(Users);

module.exports = {login, register, editUser, deleteUser, getUser, getUsers, editUserPermission, changePassword};