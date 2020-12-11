const {SECRET_KEY} = require("../config/keys");
const {sign} = require("jsonwebtoken");
const {Users} = require("../models/Users");
const {MESSAGES} = require("../utility/constants");
const {messageAlert} = require("../utility/constants");
const  {alert} = require("../utility/controllers/messages");
const  {errorThrower,errorCatcher,errorFormatter} = require("../utility/controllers/errors");
const {validationResult} = require("express-validator");


async function register(req, res, next) {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
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
        const user = await Users.findOne({email});
        if (!user) {
            return res.status(422).json({email: 'no users found'});
        }

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

module.exports = {login, register};