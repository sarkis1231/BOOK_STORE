const {MESSAGES} = require("../constants");
const {messageAlert} = require("../constants");
const {errorCatcher} = require("./errors");
const {errorThrower} = require("./errors");
const {Fn} = require("../functions");
const  {alert} = require("../controllers/messages");
const {errorValidation} = require("./errors");

let getCtrlFn = {};

getCtrlFn.Delete = function (Model) {
    if(!Model) { //TODO to be a Mongoose instance or class Mongoose
        console.error("Model not defined");
        return Fn.noop;
    }
    return async function deleteBook(req,res,next) {
        try {
            errorValidation(req);

            const p = await Model.deleteOne({id:req.params.id});
            if (Fn.isEmpty(p)) {
                errorThrower(MESSAGES.NO_SUCH_DATA_EXISTS, 422);
            }
            return alert(res, 200, messageAlert.success, MESSAGES.ITEM_DELETED);

        } catch (err) {
            errorCatcher(next, err);
        }
    }
}


module.exports = {getCtrlFn};