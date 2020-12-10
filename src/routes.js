const express = require('express');
const users = require("./routes/users");
const {isAuth} = require("./middlewares/authentication");


const router = express.Router();

router.use('/users', users);
router.use(isAuth()); //all the routes should require an Authorization
