const {readFile} = require('fs');

const {Fn} = require("../utility/functions");
const path = Fn.getUploadsDirectory();
const util = require('util');

const readFilePromise = util.promisify(readFile);

const {errorCatcher} = require("../utility/controllers/errors");

function readImage(req, res, next) {
    let location = req.params.id;
    let imageType = 'image/';
    let fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
    let type = location.match(fileExtensionPattern)[0];

    type = type.substr(1); //get rid of point
    imageType = imageType + type;
    res.set({'Content-Type': imageType});
    readFilePromise(`${path}/${location}`)
        .then(function (image) {
            res.send(image);
        }).catch(function (err) {
        errorCatcher(next, err);
    });
}

function readAFile(req, res, next) {
    let location = req.params.id;
    res.set({'Content-Type': 'application/pdf'});

    readFilePromise(`${path}/${location}`)
        .then(function (image) {
            res.send(image);
        }).catch(function (err) {
        errorCatcher(next, err);
    });
}

module.exports = {readImage, readAFile};