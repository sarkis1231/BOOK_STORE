require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const {MONGODB_URI} = require("./config/keys");
const {MONGOOSE_OPTIONS} = require("./config/keys");

const app = express();


const port = process.env.PORT || 3000
//request parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World')
})



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
            console.log(`server started on port ${port}`);
        });
    }).catch(function (err) {
    console.log(err);
});



