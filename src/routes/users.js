const {login,register} = require("../controllers/users");
const {Router} = require('express');

const {isAuth,isAuthorized} = require("../middlewares/authentication");

const {registerValidation} = require("../validations/users");


const router = Router();

router.put("/register", registerValidation, register);

router.post("/login", login);

module.exports = router;