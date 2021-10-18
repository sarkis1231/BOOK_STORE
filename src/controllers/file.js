const fs = require('promise-fs');
// TODO  use the inherent node functions
const {path} = require("../app");
const {errorCatcher} = require("../utility/controllers/errors");

function readImage(req, res, next) {
    let location = req.params.id;
    let imageType = 'image/';
    let fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
    let type = location.match(fileExtensionPattern)[0];

    type = type.substr(1); //get rid of point
    imageType = imageType + type;
    res.set({'Content-Type': imageType});
    fs.readFile(`${path}/${location}`)
        .then(function (image) {
            res.send(image);
        }).catch(function (err) {
        errorCatcher(next, err);
    });
}

function readFile(req, res, next) {
    let location = req.params.id;
    res.set({'Content-Type': 'application/pdf'});

    fs.readFile(`${path}/${location}`)
        .then(function (image) {
            res.send(image);
        }).catch(function (err) {
        errorCatcher(next, err);
    });
}

module.exports = {readImage, readFile};