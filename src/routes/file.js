const {isAuth} = require("../middlewares/authentication");
const {readImage, readAFile} = require("../controllers/file");
const {Router} = require('express');
const router = Router();

router.get('/image/:id', isAuth(), readImage);

router.get('/book/:id', isAuth(), readAFile);

module.exports = router