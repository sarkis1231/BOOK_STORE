const {Router} = require('express');
const BookValidation = require("../validations/books");
const {paramIdValidation} = require("../validations/general");

const {addBook, editBook, deleteBook, getBook, getBooks} = require("../controllers/book");

const upload = require('../utility/files');

const {isAuth, isAdmin} = require("../middlewares/authentication");


const router = Router();


let files = upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'file', maxCount: 1}
]);

router.get('/', getBooks);

router.get('/:id', paramIdValidation, getBook);



router.post('/', isAuth(), isAdmin(),
    files,
    BookValidation.add,
    addBook
);

router.put('/:id',
    isAuth(), isAdmin(),
    paramIdValidation,
    files,
    BookValidation.edit,
    editBook
);

router.delete('/:id', isAuth(), isAdmin(), paramIdValidation, deleteBook);

module.exports = router