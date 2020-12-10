const express = require('express');

const {isAuth,isAuthorized} = require("../middlewares/authentication");

const {registerValidation} = require("../validations/users");


const router = express.Router();

// router.put("/register", registerValidation, register);

// router.post("/login", login);

exports = router;