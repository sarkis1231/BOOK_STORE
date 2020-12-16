const {SECRET_KEY} = require("../config/keys");
const {sign} = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {errorValidation} = require("../utility/controllers/errors");
const {Users} = require("../models/Users");
const {MESSAGES} = require("../utility/constants");
const {messageAlert} = require("../utility/constants");
const  {alert} = require("../utility/controllers/messages");
const  {errorThrower,errorCatcher,errorFormatter} = require("../utility/controllers/errors");
const {validationResult} = require("express-validator");


async function register(req, res, next) {
    try {
        errorValidation(req);

        const {email, name, password} = req.body;
        const newUser = new Users({email, name, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        if(await newUser.save()){
            return alert(res, 200, messageAlert.success, 'Registered Successfully');
        }
        alert(res, 304, messageAlert.success, MESSAGES.NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function login(req, res, next) {
    const {email, password} = req.body;
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

        const user = await Users.findOne({email});

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({email: 'Wrong Auth'})
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

        const user = await Users.findOne({email});
        user.name = name;
        user.email = email;

        if(await user.save()){
            return  alert(res,200,messageAlert.success,MESSAGES.VALUE_IS_CHANGED);
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function deleteUser(req,res,next) {
    try {
        errorValidation(req);

        const p = await Users.deleteOne({id:req.params.id});
        if (isEmpty(p)) {
            errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
        }
        return alert(res, 200, messageAlert.success, ITEM_DELETED);

    } catch (err) {
        errorCatcher(next, err);
    }
}

module.exports = {login, register, editUser,deleteUser};