const {Router} = require('express');
const users = require("./routes/users");
const books = require("./routes/books");
const {isAuth} = require("./middlewares/authentication");

1
const router = Router();

router.use('/users', users);
router.use('/books',books);
// router.use(isAuth()); //all the routes should require an Authorization

module.exports = router;