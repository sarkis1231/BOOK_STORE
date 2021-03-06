const modelUtil = require("../utility/model");
const {SCHEMES_NAMES,LIMITS} = require("../utility/constants");
const {Schema, model} = require("mongoose");

let permissionSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: SCHEMES_NAMES.Users,
        required: true
    },
    genre: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: SCHEMES_NAMES.Genres,
                required: true
            },
            limit: {
                type: Number,
                default: LIMITS.min,
                required: true
            }
        }
    ],
    premium: {
        type: Boolean
    }
}, {timestamps: true});

permissionSchema.statics.getById = modelUtil.getById;

const Permissions = model(SCHEMES_NAMES.Permissions, permissionSchema);

module.exports = {Permissions};