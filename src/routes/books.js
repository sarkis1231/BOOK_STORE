const {Router} = require('express');
const BookValidation = require("../validations/books");
const {paramIdValidation} =  require("../validations/general");

const {addBook,editBook,deleteBook} = require("../controllers/book");

const {isAuth,isAdmin} = require("../middlewares/authentication");



const router = Router();


router.post('/',isAuth(),isAdmin(),BookValidation.add,addBook);

router.put('/:id',isAuth(),isAdmin(),paramIdValidation,BookValidation.edit,editBook);

router.delete('/:id',isAuth(),isAdmin(),paramIdValidation,deleteBook);

module.exports = router