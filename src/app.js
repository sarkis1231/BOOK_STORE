require('dotenv').config(); // TODO try with normal CI External Variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = require('./routes');
const passport = require("passport");
const cors = require("cors");

const helmet = require("helmet");
const {MONGODB_URI, MONGOOSE_OPTIONS, REDIS_URI} = require("./config/keys");
const passportConfig = require("./config/passport");
const {Fn} = require("./utility/functions");

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
app.use('/api', router);


if (process.env.NODE_ENV === 'CI') {
    const path = require('path');

    // all images and static files imported in the react application
    app.use(express.static(path.resolve(__dirname, '../client/build')));

    app.get('*', function ({url}, res) {
        let filePath = '';
        let obj = {
            'js': true,
            'css': true,
            'png': true,
            'jpg': true,
            'svg':true
        };

        if (obj[url.substr(url.lastIndexOf('.') + 1)]) {
            filePath = path.join(__dirname, '..' ,'client' , 'build', url);
        } else {
            filePath = path.join(__dirname, '..' ,'client' ,'build', 'index.html');
        }
        return res.sendFile(filePath);
    });
}


// errors
app.use(function (err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message, data});
});


const port = process.env.PORT || 8080;

mongoose.connection.on('connected', function () {
    Fn.LOG('Mongoose default connection open to ' + MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    Fn.LOG('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    Fn.LOG('Mongoose default connection disconnected');
});

mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS)
    .then(function () {
        app.listen(port, () => {
            if (process.env.NODE_ENV === 'CI') {
                console.log('Server and Mongodb are ready');
            } else {
                Fn.LOG(`HTTP server started on port ${port}`);
                Fn.LOG(`Environment is ${process.env.NODE_ENV}`);
                Fn.LOG(`Node version ${process.version}`);
            }
        });
    }).catch(function (err) {
    console.log(err);
});


// redis
const {redis_client} = require('./redis_client');

redis_client.on('ready', function () {
    if (process.env.NODE_ENV === 'CI') {
        console.log('Redis is Ready');
    } else {
        Fn.LOG(`Redis connection is ready ${REDIS_URI}`);
    }
});

redis_client.on('error', function (error) {
    Fn.LOG(error);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        Fn.LOG('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
