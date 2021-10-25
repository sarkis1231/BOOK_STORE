const AuthorsCtrl = require("../controllers/authors");
const {Router} = require('express');
const {isAdmin} = require("../middlewares/authentication");
const {paramIdValidation} = require("../validations/general");

const AuthorValidation = require("../validations/authors");


const router = Router();

router.get('/', AuthorsCtrl.getAuthors);

router.get('/:id', paramIdValidation, AuthorsCtrl.getAuthor);

router.post('/', isAdmin(), AuthorValidation.add, AuthorsCtrl.addAuthor);

router.put('/:id', isAdmin(), AuthorValidation.edit, AuthorsCtrl.editAuthor);

router.delete('/:id', isAdmin(), paramIdValidation, AuthorsCtrl.deleteAuthor);

module.exports = router;