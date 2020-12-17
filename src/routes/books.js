const {editBookValidation} = require("../validations/books");
const {deleteBook} = require("../controllers/book");
const {editBook} = require("../controllers/book");
const {Router} = require('express');

const {paramIdValidation} =  require("../validations/general");

const {isAuth,isAdmin} = require("../middlewares/authentication");



const router = Router();


router.post('/',isAuth(),isAdmin(),addBookValidation,editBook);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,editBookValidation,editBook);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteBook);

module.exports = router