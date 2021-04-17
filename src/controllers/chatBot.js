const {noResult} = require("../utility/controllers/messages");
const {Fn} = require("../utility/functions");
const {getCtrlFn} = require("../utility/controllers/functions");
const {errorCatcher} = require("../utility/controllers/errors");
const {errorValidation} = require("../utility/controllers/errors");
const {messageAlert} = require("../utility/constants");
const {MESSAGES} = require("../utility/constants");
const {alert} = require("../utility/controllers/messages");
const {ChatBots} = require("../models/ChatBot");

async function getBotMessages(req, res, next) {
    try {
        errorValidation(req);
        let items =
            await ChatBots.find({disabled: {$ne: true}})
                .populate({
                    path: 'uid', select: 'name email'
                })
        if (!Fn.isEmpty(items)) {
            return res.status(200).json(items);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function addBotMessages(req, res, next) {
    const {message} = req.body;
    try {
        errorValidation(req);
        const chatBot = new ChatBots({message, uid: req.user._id});
        if (await chatBot.save()) {
            return alert(res, 200, messageAlert.success, MESSAGES.NEW_MESSAGE_ADDED);
        }

    } catch (err) {
        errorCatcher(next, err);
    }
}

let deleteBotMessage = getCtrlFn.Delete(ChatBots);

module.exports = {getBotMessages, addBotMessages, deleteBotMessage};
