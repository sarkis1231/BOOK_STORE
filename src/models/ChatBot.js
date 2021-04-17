const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

let chatBotValidation = new Schema({
    message: {
        type: String,
        required: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Users,
        required: true
    },
    disabled: {
        type: Boolean
    }
}, {timestamps: true});

chatBotValidation = modelUtil.addSchemaStaticFunctions(chatBotValidation);

const ChatBots = model(SCHEMES_NAMES.ChatBot, chatBotValidation);

module.exports = {ChatBots};