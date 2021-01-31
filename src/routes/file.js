const {Router} = require('express');
const router = Router();
const fs = require('promise-fs');
const path = require("path");
const dir = path.join(__dirname, 'images');

router.get('image/:id', function (req, res, next) {
    let location = req.params.id;
    let imageType = 'image/jpeg' | 'image/png';
    res.set({'Content-Type': imageType});
    fs.readFile(`${dir}${location}`)
        .then(function (image) {
            console.log(image);
        });
});

router.get('book/:id', function (req, res, next) {
    let location = req.params.id;

    res.set({'Content-Type': 'application/pdf'});

    fs.readFile(`${dir}${location}`)
        .then(function (pdf) {
            console.log(pdf);
        });
});

module.exports = router