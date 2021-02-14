const {Router} = require('express');
const BookValidation = require("../validations/books");
const {paramIdValidation} = require("../validations/general");

const BooksCtrl = require("../controllers/book");

const upload = require('../utility/files');

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();


let files = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'file', maxCount: 1}
]);

router.get('/', isAuth(),BooksCtrl.getBooks);

router.get('/filter', isAuth(),BookValidation.filter, BooksCtrl.getBooksWithFilter);

router.get('/:id', isAuth(), isAdmin(), paramIdValidation, BooksCtrl.getBook);


router.post('/',
    isAuth(),
    isAdmin(),
    files,
    BookValidation.add,
    BooksCtrl.addBook
);

router.put('/:id',
    isAuth(),
    isAdmin(),
    paramIdValidation,
    files,
    BookValidation.edit,
    BooksCtrl.editBook
);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, BooksCtrl.deleteBook);

module.exports = router