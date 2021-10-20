// General Mongoose ORM configs

const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const modelUtil = require("./utility/model");
const {Fn} = require("./utility/functions");


function CustomSchema(...params) {
    const schema = new Schema(...params);

    schema.statics.getAll = async function (query, ignore, lean) {
        query = modelUtil.getQueryWithDisable(query);
        if (lean) {
            return this.find(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.find(query, modelUtil.ignoreQry(ignore));
    };

    schema.statics.getOne = async function (query, ignore, lean) {
        query = modelUtil.getQueryWithDisable(query);
        if (lean) {
            return this.findOne(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.findOne(query, modelUtil.ignoreQry(ignore));
    };

    schema.statics.getById = async function (id, ignore, lean) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        let query = modelUtil.getQueryWithDisable({});
        query._id = id;
        if (lean) {
            return this.findOne(query, modelUtil.ignoreQry(ignore)).lean();
        }
        return this.findOne(query, modelUtil.ignoreQry(ignore));
    };

    schema.statics.disable = async function (query) {
        query = modelUtil.getQueryWithDisable(query);
        return this.update(query, {
            $set: {
                disabled: true
            }
        });
    };

    schema.statics.disableById = async function (id) {
        if (Fn.isUndefined(id)) {
            return Promise.reject('id should be defined');
        }
        return this.findByIdAndUpdate(id, {disabled: true});
    };

    return schema;
}



module.exports = CustomSchema;


