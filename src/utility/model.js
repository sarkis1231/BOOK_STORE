const {Fn} = require("./functions");
const {Model} = require("mongoose");
let modelUtil = {};

modelUtil.getQueryWithDisable = function (qry) {
    qry = qry || {};
    return {...qry, disabled: {$ne: true}}
};

modelUtil.getAll = async function (query,lean) {
    query = modelUtil.getQueryWithDisable(query);
    if(lean) {
        return this.find(query).lean();
    }
    return this.find(query);
};

modelUtil.getOne = async function (query,lean) {
    query = modelUtil.getQueryWithDisable(query);
    if (lean){
        return this.findOne(query).lean();
    }
    return this.findOne(query);
};

modelUtil.getById = async function (id,lean) {
    if(Fn.isUndefined(id)) {
        console.error('id should be defined');
        return;
    }
    let query = modelUtil.getQueryWithDisable({});
    query._id = id;
    if (lean){
        return this.findOne(query).lean();
    }
    return this.findOne(query);
};

modelUtil.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query, {
        $set: {
            disabled: true
        }
    });
};

modelUtil.disableById = async function (id) {
    if(Fn.isUndefined(id)) {
        console.error('id should be defined');
        return;
    }
    return this.findByIdAndUpdate(id,{disabled:true});
};

modelUtil.isModel = function (obj) {
    obj = obj || {}
    return obj.prototype instanceof Model
};

module.exports = modelUtil;
