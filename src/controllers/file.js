const fs = require('promise-fs');
const path = require("../app");
const {errorCatcher} = require("../utility/controllers/errors");

function readImage(req, res, next) {
    let location = req.params.id;
    let imageType = 'image/jpeg' | 'image/png';

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