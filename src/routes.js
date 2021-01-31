const {Router} = require('express');
const users = require("./routes/users");
const books = require("./routes/books");
const genre = require("./routes/genre");
const authors = require("./routes/authors");
const files = require("./routes/file");


const router = Router();

router.use('/users', users);

router.use('/books',books);

router.use('/authors',authors)

router.use('/genre',genre);

router.use('/files',files);

module.exports = router;