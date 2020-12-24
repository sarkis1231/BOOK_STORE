let modelUtil = {};

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

modelUtil.getById = async function (query) {
    query = modelUtil.getQueryWithDisable({});
    query.id = id;
    return this.findById(query);
};

modelUtil.disable = async function (query) {
    query = modelUtil.getQueryWithDisable(query);
    return this.update(query, {
        $set: {
            disable: true
        }
    });
};

modelUtil.disableById = async function (query) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};

module.exports = modelUtil;
