const {Router} = require('express');

const users = require("./routes/users");
const {isAuth} = require("./middlewares/authentication");


const router = Router();

router.use('/users', users);
router.use(isAuth()); //all the routes should require an Authorization

module.exports = router;