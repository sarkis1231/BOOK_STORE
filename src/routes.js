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
// TODO way to fix this
router.use('/books', [isAuth(), books]);

router.use('/authors', [isAuth(), authors])

router.use('/genre', [isAuth(), genre]);

router.use('/files', [isAuth(), files]);

router.use('/permissions', [isAuth(), permissions]);

router.use('/chatBot', [isAuth(), chatBot]);

module.exports = router;