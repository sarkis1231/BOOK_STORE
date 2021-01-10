const {Fn} = require("./functions");
let modelUtil = {};
//TODO bind to all the statics
modelUtil.getQueryWithDisable = function (qry) {
    qry = qry || {};
    return {...qry, disabled: {$ne: true}}
}

modelUtil.get = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.find(query);
};

modelUtil.getOne = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.findOne(query);
};

modelUtil.getById = async function (id) {
    if(Fn.isUndefined(id)) {
        console.error('id should be defined');
        return;
    }
    let query = modelUtil.getQueryWithDisable({});
    query.id = id;
    return this.findById(query);
};

modelUtil.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query, {
        $set: {
            disabled:true
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

module.exports = modelUtil;
