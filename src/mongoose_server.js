// General Mongoose ORM configs

const mongoose = require('mongoose');
const {MONGODB_URI} = require("./config/keys");
const {Schema} = require("mongoose");

const CustomSchema = function (params) {
    const schema = new Schema(...params);
    // TODO continue here the code
}





mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

module.exports = mongoose;


