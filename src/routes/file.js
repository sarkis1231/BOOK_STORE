const {Router} = require('express');
const router = Router();
const fs = require('promise-fs');
const path = require("../app");

console.log(path);

router.get('/image/:id', function (req, res, next) {
    let location = req.params.id;
    let imageType = 'image/jpeg' | 'image/png';
    res.set({'Content-Type': imageType});
    fs.readFile(`${path}/${location}`)
        .then(function (image) {
            console.log(image);
        }).catch(function (err){
            console.log(err);
    });
});

router.get('/book/:id', function (req, res, next) {
    let location = req.params.id;
    res.set({'Content-Type': 'application/pdf'});

    fs.readFile(`${path}/${location}`)
        .then(function (image) {
            console.log(image);
        }).catch(function (err){
        console.log(err);
    });
});

module.exports = router