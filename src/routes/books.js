const {Router} = require('express');
const BookValidation = require("../validations/books");
const {paramIdValidation} = require("../validations/general");

const BooksCtrl = require("../controllers/book");

const upload = require('../utility/files');

const {isAdmin} = require("../middlewares/authentication");


const router = Router();


let files = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'file', maxCount: 1}
]);

router.get('/', BooksCtrl.getBooks);

router.get('/filter', BookValidation.filter, BooksCtrl.getBooksWithFilter);

router.get('/:id', isAdmin(), paramIdValidation, BooksCtrl.getBook);

router.post('/',
    isAdmin(),
    files,
    BookValidation.add,
    BooksCtrl.addBook
);

router.put('/:id',
    isAdmin(),
    paramIdValidation,
    files,
    BookValidation.edit,
    BooksCtrl.editBook
);

router.delete('/:id', isAdmin(), paramIdValidation, BooksCtrl.deleteBook);

module.exports = router