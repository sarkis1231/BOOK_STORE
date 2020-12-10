const {Router} = require('express');

const {isAuth,isAuthorized} = require("../middlewares/authentication");

const {registerValidation} = require("../validations/users");


const router = Router();

// router.put("/register", registerValidation, register);

router.post("/login", function (){});

console.log("users beforeIport",router);
module.exports = router;