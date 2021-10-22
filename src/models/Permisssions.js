const {SCHEMES_NAMES,LIMITS} = require("../utility/constants");
const {Schema, model} = require("mongoose");
const {CustomSchema} = require("../mongoose_custom");

let permissionSchema = new CustomSchema({
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


const Permissions = model(SCHEMES_NAMES.Permissions, permissionSchema);

module.exports = {Permissions};