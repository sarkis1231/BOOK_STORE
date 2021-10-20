const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');
const CustomSchema = require("../CustomSchema");

let chatBotValidation = new CustomSchema({
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

const ChatBots = model(SCHEMES_NAMES.ChatBot, chatBotValidation);

module.exports = {ChatBots};