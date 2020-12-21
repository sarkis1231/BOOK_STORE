let modelStatics = {};

modelStatics.get = async function (query) {
    return this.find(query);
};

modelStatics.getOne = async function (query) {
    return this.findOne(query);
};

modelStatics.getById = async function (query) {
//setting disable to true with a promise array and promise all
};

modelStatics.disable = async function (query) {
//setting disable to true with a promise array and promise all
};

modelStatics.disableById = async function (query) {
    let element = this.findById(query);
    element.disabled = true;
    return element.save();
};
