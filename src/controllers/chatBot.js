const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher} = require("../utility/controllers/errors");
const {errorValidation} = require("../utility/controllers/errors");
const {messageAlert} = require("../utility/constants");
const {MESSAGES} = require("../utility/constants");
const {alert} = require("../utility/controllers/messages");
const {ChatBot} = require("../models/ChatBot");


let getBotMessages = getCtrlFn.getAll();

async function addBotMessages(req, res, next) {
    const {message} = req.body;
    try {
        errorValidation(req);
        const chatBot = new ChatBot({message, uid: req.user._id});
        if (await chatBot.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.NEW_MESSAGE_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let deleteBotMessage = getCtrlFn.Delete(ChatBot);

module.exports = {getBotMessages, addBotMessages, deleteBotMessage};
