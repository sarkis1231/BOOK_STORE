const {messageAlert} = require("../utility/constants");
const {MESSAGES} = require("../utility/constants");
const {errorThrower} = require("../utility/controllers/errors");
const {isEmpty} = require("../utility/functions");
const {errorCatcher} = require("../utility/controllers/errors");
const {Users} = require("../models/Users");
const {errorValidation} = require("../utility/controllers/errors");
const  {alert} = require("../utility/controllers/messages");



async function editBook(req, res, next) {
    const {name, email} = req.body;
    try {
        errorValidation(req);

      /*  const user = await Users.findOne({id:req.params.id});
        user.name = name;
        user.email = email;

        if(await user.save()){
            return  alert(res,200,messageAlert.success,MESSAGES.VALUE_IS_CHANGED);
        }
   */ } catch (err) {
        errorCatcher(next, err);
    }
}

async function deleteBook(req,res,next) {
    try {
        errorValidation(req);

        const p = await Users.deleteOne({id:req.params.id});
        if (isEmpty(p)) {
            errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
        }
        return alert(res, 200, messageAlert.success, MESSAGES.ITEM_DELETED);

    } catch (err) {
        errorCatcher(next, err);
    }
}

module.exports = {editBook,deleteBook};