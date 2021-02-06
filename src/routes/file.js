const {isAuth} = require("../middlewares/authentication");
const {readImage, readFile} = require("../controllers/file");
const {Router} = require('express');
const router = Router();

router.get('/image/:id', isAuth(), readImage);

router.get('/book/:id', isAuth(), readFile);

module.exports = router