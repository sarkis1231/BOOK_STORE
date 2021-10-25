const {Router} = require('express');
const users = require("./routes/users");
const books = require("./routes/books");
const genre = require("./routes/genre");
const authors = require("./routes/authors");
const files = require("./routes/file");
const permissions = require("./routes/permissions");
const chatBot = require("./routes/chatBot");
const {isAuth} = require("./middlewares/authentication");


const router = Router();

router.use('/users', users);

/* Authentication needed for following routes */
router.use(isAuth());

router.use('/books', books);

router.use('/authors', authors)

router.use('/genre', genre);

router.use('/files', files);

router.use('/permissions', permissions);

router.use('/chatBot', chatBot);

module.exports = router;