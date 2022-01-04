// GLOBAL SETUP FOR JEST

// this enviroment is crucial here
require('dotenv').config();

const mongoose = require('mongoose');

require('../src/models/Users');


// const {MONGODB_URI, MONGOOSE_OPTIONS} = require("../src/config/keys");
//
// mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS).then(function () {
// }).catch(function (err) {
//     console.log(err);
// });