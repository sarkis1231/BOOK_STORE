const {Router} = require('express');
const users = require("./routes/users");
const books = require("./routes/books");
const genre = require("./routes/genre");


const router = Router();

router.use('/users', users);

router.use('/books',books);

router.use('/genre',genre);

module.exports = router;