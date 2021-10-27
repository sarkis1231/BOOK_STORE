require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = require('./routes');
const passport = require("passport");
const cors = require("cors");

const helmet = require("helmet");
const {MONGODB_URI, MONGOOSE_OPTIONS} = require("./config/keys");
const passportConfig = require("./config/passport");


const app = express();

//security xss
app.use(helmet());

//request parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//parser body
app.use(bodyParser.json());

//CORS
app.use(cors());


// Passport middleware
app.use(passport.initialize({}));

// Passport Config
passportConfig(passport);

// Routes
app.use(router);


// errors
app.use(function (err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message, data});
});


const port = process.env.PORT || 8080;

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

mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS)
    .then(function () {
        app.listen(port, () => {
            console.log(`HTTP server started on port ${port}`);
        });
    }).catch(function (err) {
    console.log(err);
});


// redis
require('./redis_client');

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
