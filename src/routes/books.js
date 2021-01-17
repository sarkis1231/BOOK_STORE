const {Router} = require('express');
const BookValidation = require("../validations/books");
const {paramIdValidation} = require("../validations/general");

const {addBook, editBook, deleteBook, getBook, getBooks} = require("../controllers/book");

const upload = require('../utility/files');

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();


router.get('/', getBooks);

router.get('/:id', paramIdValidation ,getBook);

router.post('/', isAuth(), isAdmin(), BookValidation.add,
    /*upload.fields([
        // {name: 'image', maxCount: 1},
        {name: 'file', maxCount: 1}]),*/
     addBook
);

router.put('/:id', isAuth(), isAdmin(), paramIdValidation, BookValidation.edit,
    /*upload.fields([
        // {name: 'image', maxCount: 1},
        {name: 'file', maxCount: 1}]),*/
    editBook
);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, deleteBook);

module.exports = router