const modelUtil = require("../utility/model");
const {Schema, model} = require("mongoose");
const {SCHEMES_NAMES} = require('../utility/constants');

let charBotSchema = new Schema({
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

charBotSchema = modelUtil.addSchemaStaticFunctions(charBotSchema);

const ChatBots = model(SCHEMES_NAMES.ChatBot, charBotSchema);

module.exports = {ChatBots};